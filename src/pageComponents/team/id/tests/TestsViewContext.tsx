import { COOKIES } from "@/constants";
import { useWorkspaceTests } from "@/graphql/queries/useWorkspaceTests";
import { TestSuiteTestSummary } from "@/graphql/types";
import {
  DEFAULT_DATE_RANGE_FILTER,
  DateRange,
  getDateForDateRange,
} from "@/pageComponents/team/constants";
import { DEFAULT_SORT_BY_FILTER, SortBy } from "@/pageComponents/team/id/tests/constants";
import { setCookieValueClient } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

export type Filters = {
  dateRange: DateRange;
  filterText: string;
  sortBy: SortBy;
};

export const TestsViewContext = createContext<
  Filters & {
    isLoading: boolean;
    isPending: boolean;
    retentionLimit: number | null;
    selectedTestSummaryId: string | undefined;
    selectTestSummary: (id: string) => void;
    testSummaries: TestSuiteTestSummary[] | undefined;
    updateFilters: (value: Partial<Filters>) => void;
  }
>(null as any);

export function ContextRoot({
  children,
  defaultTestSummaryId,
  filters,
  retentionLimit,
  workspaceId,
}: PropsWithChildren & {
  filters: Partial<Filters> | null;
  defaultTestSummaryId: string | null;
  retentionLimit: number | null;
  workspaceId: string;
}) {
  const [state, setState] = useState<Filters>({
    dateRange: DEFAULT_DATE_RANGE_FILTER,
    filterText: "",
    sortBy: DEFAULT_SORT_BY_FILTER,
    ...filters,
  });

  const { dateRange, filterText, sortBy } = state;

  useEffect(() => {
    setCookieValueClient(COOKIES.testsFilters, {
      dateRange,
      sortBy,
    });
  }, [dateRange, sortBy]);

  const [isPending, startTransition] = useTransition();

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
    (partialState: Partial<Filters>) => {
      startTransition(() => {
        setState(prevState => ({
          ...prevState,
          ...partialState,
        }));
      });
    },
    [setState]
  );

  const startDate = getDateForDateRange(state.dateRange);

  const { isLoading, testSummaries } = useWorkspaceTests(workspaceId, startDate);

  const filteredTestSummaries = useMemo(() => {
    let summaries = Array.from(testSummaries ?? []);

    summaries = summaries.filter(test => {
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
  }, [filterText, sortBy, testSummaries]);

  const filteredSelectedTestSummaryId = useMemo(
    () => filteredTestSummaries.find(summary => summary.id === selectedTestSummaryId)?.id,
    [filteredTestSummaries, selectedTestSummaryId]
  );

  const value = useMemo(
    () => ({
      dateRange,
      filterText,
      isLoading,
      isPending,
      retentionLimit,
      selectedTestSummaryId: filteredSelectedTestSummaryId,
      selectTestSummary,
      sortBy,
      testSummaries: filteredTestSummaries,
      updateFilters,
    }),
    [
      dateRange,
      filteredSelectedTestSummaryId,
      filteredTestSummaries,
      filterText,
      isLoading,
      isPending,
      retentionLimit,
      selectTestSummary,
      sortBy,
      updateFilters,
    ]
  );

  return <TestsViewContext.Provider value={value}>{children}</TestsViewContext.Provider>;
}
