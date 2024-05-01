import { COOKIES } from "@/constants";
import { useTestSuiteTestRuns } from "@/graphql/queries/useTestSuiteTestRuns";
import { useTestSuiteTests } from "@/graphql/queries/useTestSuiteTests";
import { TestRun, TestSuiteTest } from "@/graphql/types";
import {
  DEFAULT_DATE_RANGE_FILTER,
  DateRange,
  getDateForDateRange,
} from "@/pageComponents/team/constants";
import {
  Branch,
  DEFAULT_BRANCH_FILTER,
  DEFAULT_RUN_STATUS_FILTER,
  DEFAULT_TEST_STATUS_FILTER,
  RunStatus,
  TestStatus,
} from "@/pageComponents/team/id/runs/constants";
import { setCookieValueClient } from "@/utils/cookie";
import { filterTest, filterTestRun } from "@/utils/test-suites";
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
    retentionLimit: number | null;
    selectedTestRunId: string | undefined;
    selectedTestId: string | undefined;
    selectTest: (id: string) => void;
    selectTestRun: (id: string) => void;
    testRuns: TestRun[] | undefined;
    tests: TestSuiteTest[] | undefined;
    updateFilters(value: Partial<Filters>): void;
  }
>(null as any);

export function ContextRoot({
  children,
  defaultTestId,
  defaultTestRunId,
  filters,
  retentionLimit,
  workspaceId,
}: PropsWithChildren & {
  filters: Partial<Filters> | null;
  defaultTestId: string | null;
  defaultTestRunId: string | null;
  retentionLimit: number | null;
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

  const { runsBranch, runsDateRange, runsFilterText, runsStatus, testsFilterText, testsStatus } =
    state;

  useEffect(() => {
    setCookieValueClient(COOKIES.testRunsFilters, {
      runsBranch,
      runsDateRange,
      runsStatus,
      testsStatus,
    });
  }, [runsBranch, runsDateRange, runsStatus, testsStatus]);

  const [isPending, startTransition] = useTransition();

  const [selectedTestRunId, setSelectedTestRunId] = useState<string | undefined>(
    defaultTestRunId || undefined
  );
  const [selectedTestId, setSelectedTestId] = useState<string | undefined>(
    defaultTestId || undefined
  );

  const router = useRouter();

  const selectTest = useCallback(
    (id: string) => {
      startTransition(() => {
        setSelectedTestId(id);

        const url = new URL(window.location.href);
        url.searchParams.set("testId", id);

        router.replace(url.toString());
      });
    },
    [router]
  );

  const selectTestRun = useCallback(
    (id: string) => {
      setSelectedTestRunId(id);
      setSelectedTestId(undefined);

      const url = new URL(window.location.href);
      url.searchParams.set("testRunId", id);
      url.searchParams.set("testId", "");

      router.replace(url.toString());
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

  const startDate = getDateForDateRange(state.runsDateRange);

  const { isLoading: isLoadingTestRuns, testRuns } = useTestSuiteTestRuns(workspaceId, startDate);

  const filteredTestRuns = useMemo(() => {
    return testRuns?.filter(testRun =>
      filterTestRun(testRun, {
        afterDate: startDate,
        branch: runsBranch,
        status: runsStatus,
        text: runsFilterText,
      })
    );
  }, [runsBranch, runsFilterText, runsStatus, startDate, testRuns]);

  const { isLoading: isLoadingTests, tests } = useTestSuiteTests(workspaceId, selectedTestRunId);

  const filteredTests = useMemo(() => {
    return tests
      ?.filter(test =>
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
      retentionLimit,
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
      retentionLimit,
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

  return <RunsViewContext.Provider value={value}>{children}</RunsViewContext.Provider>;
}
