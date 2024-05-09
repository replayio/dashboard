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
  useLayoutEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

export type State = {
  canShowSelectedTestNotFoundWarning: boolean;
  canShowSelectedTestRunNotFoundWarning: boolean;
  initialTestIdFromURL: string | undefined;
  initialTestRunIdFromURL: string | undefined;
  runsBranch: Branch;
  runsDateRange: DateRange;
  runsFilterText: string;
  runsStatus: RunStatus;
  testsFilterText: string;
  testsStatus: TestStatus;
};

type Prompts = {
  showInitialSelectedTestNotFoundWarning: boolean;
  showInitialSelectedTestRunNotFoundWarning: boolean;
  showSelectTestRunPrompt: boolean;
  showSelectTestPrompt: boolean;
  showTestRunsFilterMatchWarning: boolean;
  showTestsFilterMatchWarning: boolean;
};

export const RunsViewContext = createContext<
  Omit<State, "canShowSelectedTestNotFoundWarning" | "canShowSelectedTestRunNotFoundWarning"> &
    Prompts & {
      isLoadingTestRuns: boolean;
      isLoadingTests: boolean;
      isPending: boolean;
      retentionLimit: number | null;
      selectedTest: TestSuiteTest | undefined;
      selectedTestRun: TestRun | undefined;
      selectedTestRunId: string | undefined;
      selectedTestId: string | undefined;
      selectTest: (id: string) => void;
      selectTestRun: (id: string) => void;
      testRuns: TestRun[] | undefined;
      tests: TestSuiteTest[] | undefined;
      updateFilters(value: Partial<State>): void;
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
  filters: Partial<State> | null;
  defaultTestId: string | null;
  defaultTestRunId: string | null;
  retentionLimit: number | null;
  workspaceId: string;
}) {
  const [state, setState] = useState<State>({
    canShowSelectedTestNotFoundWarning: true,
    canShowSelectedTestRunNotFoundWarning: true,
    initialTestIdFromURL: defaultTestId || undefined,
    initialTestRunIdFromURL: defaultTestRunId || undefined,
    runsBranch: DEFAULT_BRANCH_FILTER,
    runsDateRange: DEFAULT_DATE_RANGE_FILTER,
    runsFilterText: "",
    runsStatus: DEFAULT_RUN_STATUS_FILTER,
    testsFilterText: "",
    testsStatus: DEFAULT_TEST_STATUS_FILTER,
    ...filters,
  });

  const {
    canShowSelectedTestNotFoundWarning,
    canShowSelectedTestRunNotFoundWarning,
    initialTestIdFromURL,
    initialTestRunIdFromURL,
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

  // TODO [PRO-381] Move setSelectedTestId and setSelectedTestRunId into State
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

        setState(prevState => ({
          ...prevState,
          canShowSelectedTestNotFoundWarning: true,
        }));
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

      setState(prevState => ({
        ...prevState,
        canShowSelectedTestRunNotFoundWarning: true,
      }));
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

  const selectedTestRun = selectedTestRunId
    ? filteredTestRuns?.find(testRun => testRun.id === selectedTestRunId)
    : undefined;

  const { isLoading: isLoadingTests, tests } = useTestSuiteTests(workspaceId, selectedTestRunId);

  const filteredTests = useMemo(() => {
    if (!selectedTestRun) {
      return [];
    }

    return tests
      ?.filter(test =>
        filterTest(test, {
          status: testsStatus,
          text: testsFilterText,
        })
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [tests, selectedTestRun, testsFilterText, testsStatus]);

  const selectedTest =
    selectedTestRun && selectedTestId
      ? filteredTests?.find(test => test.id === selectedTestId)
      : undefined;

  useLayoutEffect(() => {
    if (defaultTestRunId && state.canShowSelectedTestRunNotFoundWarning && selectedTestRun) {
      setState(prevState => ({
        ...prevState,
        canShowSelectedTestRunNotFoundWarning: false,
      }));
    }
    if (defaultTestId && state.canShowSelectedTestNotFoundWarning && selectedTest) {
      setState(prevState => ({
        ...prevState,
        canShowSelectedTestNotFoundWarning: false,
      }));
    }
  }, [defaultTestId, defaultTestRunId, selectedTest, selectedTestRun, state]);

  const showInitialSelectedTestRunNotFoundWarning =
    !isLoadingTestRuns &&
    !!defaultTestRunId &&
    !selectedTestRun &&
    canShowSelectedTestRunNotFoundWarning;
  const showInitialSelectedTestNotFoundWarning =
    !isLoadingTests && !!defaultTestId && !selectedTest && canShowSelectedTestNotFoundWarning;
  const showSelectTestRunPrompt = !selectedTestRun && !!filteredTestRuns?.length;
  const showSelectTestPrompt = !!selectedTestRun && !selectedTest && !!filteredTests?.length;
  const showTestRunsFilterMatchWarning = !filteredTestRuns?.length;
  const showTestsFilterMatchWarning =
    !!selectedTestRun && !filteredTests?.length && !!tests?.length;

  const value = useMemo(
    () => ({
      initialTestIdFromURL,
      initialTestRunIdFromURL,
      isLoadingTestRuns,
      isLoadingTests,
      isPending,
      retentionLimit,
      runsBranch,
      runsDateRange,
      runsFilterText,
      runsStatus,
      selectedTest,
      selectedTestRun,
      selectedTestRunId,
      selectedTestId,
      selectTest,
      selectTestRun,
      showInitialSelectedTestNotFoundWarning,
      showInitialSelectedTestRunNotFoundWarning,
      showSelectTestRunPrompt,
      showSelectTestPrompt,
      showTestRunsFilterMatchWarning,
      showTestsFilterMatchWarning,
      testsFilterText,
      testRuns: filteredTestRuns,
      tests: filteredTests,
      testsStatus,
      updateFilters,
    }),
    [
      filteredTestRuns,
      filteredTests,
      initialTestIdFromURL,
      initialTestRunIdFromURL,
      isLoadingTestRuns,
      isLoadingTests,
      isPending,
      retentionLimit,
      runsDateRange,
      runsBranch,
      runsFilterText,
      runsStatus,
      selectedTest,
      selectedTestRun,
      selectedTestRunId,
      selectedTestId,
      selectTest,
      selectTestRun,
      showInitialSelectedTestNotFoundWarning,
      showInitialSelectedTestRunNotFoundWarning,
      showSelectTestRunPrompt,
      showSelectTestPrompt,
      showTestRunsFilterMatchWarning,
      showTestsFilterMatchWarning,
      testsFilterText,
      testsStatus,
      updateFilters,
    ]
  );

  return <RunsViewContext.Provider value={value}>{children}</RunsViewContext.Provider>;
}
