import { COOKIES } from "@/constants";
import { useTestSuiteTestRuns } from "@/graphql/queries/useTestSuiteTestRuns";
import { useTestSuiteTests } from "@/graphql/queries/useTestSuiteTests";
import { TestRun, TestSuiteTest } from "@/graphql/types";
import {
  Branch,
  DEFAULT_BRANCH_FILTER,
  DEFAULT_DATE_RANGE_FILTER,
  DEFAULT_RUN_STATUS_FILTER,
  DEFAULT_TEST_STATUS_FILTER,
  DateRange,
  RunStatus,
  TestStatus,
} from "@/pageComponents/team/id/runs/constants";
import { setCookieValueClient } from "@/utils/cookie";
import { getRelativeDate } from "@/utils/date";
import { filterTest, filterTestRun } from "@/utils/test-suites";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

export type Filters = {
  runsBranch: Branch;
  runsDateRange: DateRange;
  runsFilterText: string;
  runsStatus: RunStatus;
  testsFilterText: string;
  testsStatus: TestStatus;
};

export const RunsViewContext = createContext<
  Filters & {
    isLoadingTestRuns: boolean;
    isLoadingTests: boolean;
    isPending: boolean;
    selectedTestRunId: string | undefined;
    selectedTestId: string | undefined;
    selectTest: Dispatch<SetStateAction<string | undefined>>;
    selectTestRun: Dispatch<SetStateAction<string | undefined>>;
    testRuns: TestRun[] | undefined;
    tests: TestSuiteTest[] | undefined;
    updateFilters(value: Partial<Filters>): void;
  }
>(null as any);

export function ContextRoot({
  children,
  filters,
  workspaceId,
}: PropsWithChildren & {
  filters: Partial<Filters> | null;
  workspaceId: string;
}) {
  const [state, setState] = useState<Filters>({
    runsBranch: DEFAULT_BRANCH_FILTER,
    runsDateRange: DEFAULT_DATE_RANGE_FILTER,
    runsFilterText: "",
    runsStatus: DEFAULT_RUN_STATUS_FILTER,
    testsFilterText: "",
    testsStatus: DEFAULT_TEST_STATUS_FILTER,
    ...filters,
  });

  const {
    runsBranch,
    runsDateRange,
    runsFilterText,
    runsStatus,
    testsFilterText,
    testsStatus,
  } = state;

  useEffect(() => {
    setCookieValueClient(COOKIES.testRunsFilters, {
      runsBranch,
      runsDateRange,
      runsStatus,
      testsStatus,
    });
  }, [runsBranch, runsDateRange, runsStatus, testsStatus]);

  const [isPending, startTransition] = useTransition();

  const [selectedTestRunId, setSelectedTestRunId] = useState<
    string | undefined
  >(undefined);
  const [selectedTestId, setSelectedTestId] = useState<string | undefined>(
    undefined
  );

  const selectTest = useCallback(
    (value: SetStateAction<string | undefined>) => {
      startTransition(() => {
        setSelectedTestId(value);
      });
    },
    []
  );

  const selectTestRun = useCallback(
    (value: SetStateAction<string | undefined>) => {
      setSelectedTestRunId(value);
      setSelectedTestId(undefined);
    },
    []
  );

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
  switch (state.runsDateRange) {
    case "day":
      startDate = getRelativeDate({ daysAgo: 1 });
      break;
    case "hour":
      startDate = getRelativeDate({ hoursAgo: 1 });
      break;
    case "week":
    default:
      startDate = getRelativeDate({ daysAgo: 7 });
      break;
  }

  const { isLoading: isLoadingTestRuns, testRuns } = useTestSuiteTestRuns(
    workspaceId,
    startDate
  );

  const filteredTestRuns = useMemo(() => {
    return testRuns?.filter((testRun) =>
      filterTestRun(testRun, {
        afterDate: getRelativeDate({ daysAgo: 6 }),
        branch: runsBranch,
        status: runsStatus,
        text: runsFilterText,
      })
    );
  }, [runsBranch, runsFilterText, runsStatus, testRuns]);

  const { isLoading: isLoadingTests, tests } = useTestSuiteTests(
    workspaceId,
    selectedTestRunId
  );

  const filteredTests = useMemo(() => {
    return tests
      ?.filter((test) =>
        filterTest(test, {
          status: testsStatus,
          text: testsFilterText,
        })
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [tests, testsFilterText, testsStatus]);

  const value = useMemo(
    () => ({
      isLoadingTestRuns,
      isLoadingTests,
      isPending,
      runsBranch,
      runsDateRange,
      runsFilterText,
      runsStatus,
      selectedTestRunId,
      selectedTestId,
      selectTest,
      selectTestRun,
      testsFilterText,
      testRuns: filteredTestRuns,
      tests: filteredTests,
      testsStatus,
      updateFilters,
    }),
    [
      filteredTestRuns,
      filteredTests,
      isLoadingTestRuns,
      isLoadingTests,
      isPending,
      runsDateRange,
      runsBranch,
      runsFilterText,
      runsStatus,
      selectedTestRunId,
      selectedTestId,
      selectTest,
      selectTestRun,
      testsFilterText,
      testsStatus,
      updateFilters,
    ]
  );

  return (
    <RunsViewContext.Provider value={value}>
      {children}
    </RunsViewContext.Provider>
  );
}
