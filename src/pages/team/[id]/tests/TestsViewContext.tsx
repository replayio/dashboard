import { LOCAL_STORAGE } from "@/constants";
import { useWorkspaceTests } from "@/graphql/queries/useWorkspaceTests";
import { TestSuiteTestSummary } from "@/graphql/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  DEFAULT_DATE_RANGE_FILTER,
  DEFAULT_SORT_BY_FILTER,
  DateRange,
  SortBy,
} from "@/pages/team/[id]/tests/constants";
import { getRelativeDate } from "@/utils/date";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";

type Filters = {
  dateRange: DateRange;
  filterText: string;
  sortBy: SortBy;
};

export const TestsViewContext = createContext<
  Filters & {
    isLoading: boolean;
    isPending: boolean;
    selectedTestSummaryId: string | undefined;
    selectTestSummary: (id: string) => void;
    testSummaries: TestSuiteTestSummary[] | undefined;
    updateFilters: (value: Partial<Filters>) => void;
  }
>(null as any);

export function ContextRoot({
  children,
  workspaceId,
}: PropsWithChildren & {
  workspaceId: string;
}) {
  const [state, setState] = useLocalStorage<Filters>(
    LOCAL_STORAGE.testFilters,
    {
      dateRange: DEFAULT_DATE_RANGE_FILTER,
      filterText: "",
      sortBy: DEFAULT_SORT_BY_FILTER,
    }
  );

  const { dateRange, filterText, sortBy } = state;

  const [isPending, startTransition] = useTransition();

  const [selectedTestSummaryId, setSelectedTestSummaryId] = useState<
    string | undefined
  >(undefined);

  const selectTestSummary = useCallback((id: string) => {
    startTransition(() => {
      setSelectedTestSummaryId(id);
    });
  }, []);

  const updateFilters = useCallback(
    (partialState: Partial<Filters>) => {
      startTransition(() => {
        setState((prevState) => ({
          ...prevState,
          ...partialState,
        }));
      });
    },
    [setState]
  );

  let startDate: Date;
  switch (state.dateRange) {
    case "day":
      startDate = getRelativeDate({ daysAgo: 1 });
      break;
    case "week":
      startDate = getRelativeDate({ daysAgo: 7 });
      break;
    case "hour":
      startDate = getRelativeDate({ hoursAgo: 1 });
      break;
  }

  const { isLoading, testSummaries } = useWorkspaceTests(
    workspaceId,
    startDate
  );

  const filteredTestSummaries = useMemo(() => {
    let summaries = Array.from(testSummaries ?? []);

    summaries = summaries.filter((test) => {
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
    () =>
      filteredTestSummaries.find(
        (summary) => summary.id === selectedTestSummaryId
      )?.id,
    [filteredTestSummaries, selectedTestSummaryId]
  );

  const value = useMemo(
    () => ({
      dateRange,
      filterText,
      isLoading,
      isPending,
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
      selectTestSummary,
      sortBy,
      updateFilters,
    ]
  );

  return (
    <TestsViewContext.Provider value={value}>
      {children}
    </TestsViewContext.Provider>
  );
}
