import { COOKIES } from "@/constants";
import { useWorkspaceTestExecutions } from "@/graphql/queries/useWorkspaceTestExecutions";
import { useWorkspaceTests } from "@/graphql/queries/useWorkspaceTests";
import { TestSuiteTestExecution, TestSuiteTestSummary } from "@/graphql/types";
import {
  DEFAULT_DATE_RANGE_FILTER,
  DateRange,
  getDateForDateRange,
} from "@/pageComponents/team/constants";
import { DEFAULT_SORT_BY_FILTER, SortBy } from "@/pageComponents/team/id/tests/constants";
import { setCookieValueClient } from "@/utils/cookie";
import { getStartOfDayUTC } from "@/utils/date";
import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

export type State = {
  canShowInitialSelectedTestSummaryNotFoundWarning: boolean;
  dateRange: DateRange;
  filterText: string;
  initialTestSummaryIdFromURL: string | undefined;
  sortBy: SortBy;
};

type Prompts = {
  showInitialSelectedTestSummaryNotFoundWarning: boolean;
  showSelectTestSummaryPrompt: boolean;
  showTestSummariesFilterMatchWarning: boolean;
};

export const TestsViewContext = createContext<
  Omit<State, "canShowInitialSelectedTestSummaryNotFoundWarning"> &
    Prompts & {
      isLoadingTestExecutions: boolean;
      isLoadingTestSummaries: boolean;
      isPending: boolean;
      retentionLimit: number | null;
      selectedTestSummary: TestSuiteTestSummary | undefined;
      selectTestSummary: (id: string) => void;
      testExecutions: TestSuiteTestExecution[] | undefined;
      testSummaries: TestSuiteTestSummary[] | undefined;
      updateFilters: (value: Partial<State>) => void;
    }
>(null as any);

export function ContextRoot({
  children,
  defaultTestSummaryId,
  filters,
  retentionLimit,
  workspaceId,
}: PropsWithChildren & {
  filters: Partial<State> | null;
  defaultTestSummaryId: string | null;
  retentionLimit: number | null;
  workspaceId: string;
}) {
  const [state, setState] = useState<State>({
    dateRange: DEFAULT_DATE_RANGE_FILTER,
    canShowInitialSelectedTestSummaryNotFoundWarning: true,
    filterText: "",
    initialTestSummaryIdFromURL: defaultTestSummaryId || undefined,
    sortBy: DEFAULT_SORT_BY_FILTER,
    ...filters,
  });

  const {
    canShowInitialSelectedTestSummaryNotFoundWarning,
    dateRange,
    filterText,
    initialTestSummaryIdFromURL,
    sortBy,
  } = state;

  useEffect(() => {
    setCookieValueClient(COOKIES.testsFilters, {
      dateRange,
      sortBy,
    });
  }, [dateRange, sortBy]);

  const [isPending, startTransition] = useTransition();

  // TODO [PRO-381] Move selectedTestSummaryId into State
  const [selectedTestSummaryId, setSelectedTestSummaryId] = useState<string | undefined>(
    defaultTestSummaryId || undefined
  );

  const router = useRouter();

  const selectTestSummary = useCallback(
    (id: string) => {
      startTransition(() => {
        setSelectedTestSummaryId(id);

        const url = new URL(window.location.href);
        url.searchParams.set("testSummaryId", id);

        router.replace(url.toString());
      });
    },
    [router]
  );

  const updateFilters = useCallback(
    (partialState: Partial<State>) => {
      startTransition(() => {
        setState(prevState => ({
          ...prevState,
          ...partialState,
        }));
      });
    },
    [setState]
  );

  const startDate = useMemo(() => getDateForDateRange(state.dateRange), [state.dateRange]);

  const { isLoading: isLoadingTestSummaries, testSummaries } = useWorkspaceTests(
    workspaceId,
    startDate
  );

  const filteredTestSummaries = useMemo(() => {
    let summaries = Array.from(testSummaries ?? []);

    summaries = summaries.filter(test => {
      if (test.__dateUsedForTestingOnly !== undefined) {
        // Support e2e tests
        const startOfDay = new Date(test.__dateUsedForTestingOnly);
        startOfDay.setHours(0, 0, 0, 0);
        if (startOfDay < startDate) {
          return false;
        }
      }

      if (filterText) {
        if (!test.title.toLowerCase().includes(filterText.toLowerCase())) {
          return false;
        }
      }

      return true;
    });

    summaries.sort((a, b) => {
      switch (sortBy) {
        case "flaky-rate":
          return b.stats.flakyRate - a.stats.flakyRate;
        case "alphabetically":
          return a.title.localeCompare(b.title);
        case "failure-rate":
        default:
          return b.stats.failureRate - a.stats.failureRate;
      }
    });

    return summaries;
  }, [filterText, sortBy, startDate, testSummaries]);

  const selectedTestSummary = useMemo(
    () => filteredTestSummaries.find(summary => summary.id === selectedTestSummaryId),
    [filteredTestSummaries, selectedTestSummaryId]
  );

  // Don't even try fetching more than one week of executions; it's too slow
  // Just let the GraphQL API return whatever its default is and we'll filter in memory
  const { executions: testExecutions, isLoading: isLoadingTestExecutions } =
    useWorkspaceTestExecutions(workspaceId, selectedTestSummary?.id);

  const filteredExecutions = useMemo(() => {
    if (!selectedTestSummary) {
      return [];
    }

    return testExecutions?.filter(execution => {
      const createdAt = new Date(execution.createdAt);
      switch (state.dateRange) {
        case "hour": {
          return createdAt.getTime() >= startDate.getTime();
        }
        default: {
          // GraphQL server seems to be filtering days at the start of the day, not the most recent partial day
          return getStartOfDayUTC(createdAt) >= getStartOfDayUTC(startDate);
        }
      }
    });
  }, [selectedTestSummary, state.dateRange, startDate, testExecutions]);

  useLayoutEffect(() => {
    if (
      defaultTestSummaryId &&
      state.canShowInitialSelectedTestSummaryNotFoundWarning &&
      selectedTestSummary
    ) {
      setState(prevState => ({
        ...prevState,
        canShowInitialSelectedTestSummaryNotFoundWarning: false,
      }));
    }
  }, [defaultTestSummaryId, selectedTestSummary, state]);

  const showSelectTestSummaryPrompt = !selectedTestSummary && !!filteredTestSummaries?.length;
  const showTestSummariesFilterMatchWarning = !filteredTestSummaries?.length;

  const showInitialSelectedTestSummaryNotFoundWarning =
    !isLoadingTestSummaries &&
    !!defaultTestSummaryId &&
    canShowInitialSelectedTestSummaryNotFoundWarning;

  const value = useMemo(
    () => ({
      dateRange,
      filterText,
      initialTestSummaryIdFromURL,
      isLoadingTestExecutions,
      isLoadingTestSummaries,
      isPending,
      retentionLimit,
      selectedTestSummary,
      selectTestSummary,
      showInitialSelectedTestSummaryNotFoundWarning,
      showSelectTestSummaryPrompt,
      showTestSummariesFilterMatchWarning,
      sortBy,
      testExecutions: filteredExecutions,
      testSummaries: filteredTestSummaries,
      updateFilters,
    }),
    [
      dateRange,
      filteredExecutions,
      filteredTestSummaries,
      filterText,
      initialTestSummaryIdFromURL,
      isLoadingTestExecutions,
      isLoadingTestSummaries,
      isPending,
      retentionLimit,
      selectedTestSummary,
      selectTestSummary,
      showInitialSelectedTestSummaryNotFoundWarning,
      showSelectTestSummaryPrompt,
      showTestSummariesFilterMatchWarning,
      sortBy,
      updateFilters,
    ]
  );

  return <TestsViewContext.Provider value={value}>{children}</TestsViewContext.Provider>;
}
