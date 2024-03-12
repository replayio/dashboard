import { TestRunStatusMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunStatusMenu";
import { TestRunBranchMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunsBranchMenu";
import { TestRunsDateRangeMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunsDateRangeMenu";
import { TestRunsFilterInput } from "@/app/team/[id]/recordings/TestSuite/TestRunsFilterInput";
import { TestRow } from "@/app/team/[id]/recordings/TestSuite/TestRow";
import { TestRunRow } from "@/app/team/[id]/recordings/TestSuite/TestRunRow";
import { getTestSuiteTests } from "@/graphql/queries/getTestSuiteTests";
import { getTestSuiteTestRuns } from "@/graphql/queries/getTestSuiteTestRuns";
import {
  filterTest,
  filterTestRun,
  getColorClassName,
  getTestRunTitle,
} from "@/utils/test-suites";
import { TestStatusMenu } from "@/app/team/[id]/recordings/TestSuite/TestStatusMenu";
import { TestFilterInput } from "@/app/team/[id]/recordings/TestSuite/TestFilterInput";
import { getRelativeDate } from "@/utils/date";
import { TestRunStats } from "@/app/team/[id]/recordings/TestSuite/TestRunStats";
import { TestSuiteTest, TestSuiteTestStatus } from "@/graphql/types";
import { RecordingRow } from "@/app/team/[id]/recordings/TestSuite/RecordingRow";

export async function TestSuitesPage({
  testFilter,
  testId,
  testRunBranch,
  testRunFilter,
  testRunId,
  testRunStatus,
  testStatus,
  workspaceId,
}: {
  testFilter: string;
  testId: string | null;
  testRunBranch: string;
  testRunFilter: string;
  testRunId: string | null;
  testRunStatus: string;
  testStatus: string;
  workspaceId: string;
}) {
  const testRuns = await getTestSuiteTestRuns(workspaceId);
  const tests = testRunId
    ? await getTestSuiteTests(workspaceId, testRunId)
    : null;

  const filteredTestRuns = testRuns.filter((testRun) =>
    filterTestRun(testRun, {
      afterDate: getRelativeDate({ daysAgo: 7 }),
      branch: testRunBranch,
      status: testRunStatus,
      text: testRunFilter,
    })
  );

  let durationMs = 0;
  tests?.forEach((test) => {
    durationMs += test.durationMs;
  });

  const filteredTests = tests
    ? tests.filter((test) =>
        filterTest(test, {
          status: testStatus,
          text: testFilter,
        })
      )
    : null;

  let testRunFailureRate = 0;
  {
    const failuresCount = filteredTestRuns.filter(
      ({ numFailed }) => numFailed > 0
    ).length;
    testRunFailureRate = failuresCount / filteredTestRuns.length;
  }

  const selectedTestRun = filteredTestRuns.find(
    (testRun) => testRun.id === testRunId
  );

  const selectedTest = filteredTests?.find((test) => test.id === testId);

  const categorizedTests = {
    failed: {
      color: getColorClassName("failed"),
      count: selectedTestRun?.numFailed ?? 0,
      label: "Failed",
      tests: [] as TestSuiteTest[],
    },
    flaky: {
      color: getColorClassName("flaky"),
      count: selectedTestRun?.numFlaky ?? 0,
      label: "Flaky",
      tests: [] as TestSuiteTest[],
    },
    passed: {
      color: getColorClassName("passed"),
      count: selectedTestRun?.numPassed ?? 0,
      label: "Passed",
      tests: [] as TestSuiteTest[],
    },
  };

  filteredTests?.forEach((test) => {
    switch (test.status) {
      case "failed": {
        categorizedTests.failed.tests.push(test);
        break;
      }
      case "flaky": {
        categorizedTests.flaky.tests.push(test);
        break;
      }
      case "passed": {
        categorizedTests.passed.tests.push(test);
      }
    }
  });

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2">
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="basis-4/12 shrink overflow-auto">
              <TestRunStatusMenu />
            </div>
            <div className="basis-4/12 shrink overflow-auto">
              <TestRunsDateRangeMenu />
            </div>
            <div className="basis-4/12 shrink overflow-auto">
              <TestRunBranchMenu />
            </div>
          </div>
          <TestRunsFilterInput />
        </div>
        <div className="text-center">
          Failure rate: {Math.round(testRunFailureRate * 100)}%
        </div>
        <div className="overflow-y-auto -mx-1">
          {filteredTestRuns.map((testRun) => (
            <TestRunRow
              currentTestRunId={testRunId}
              key={testRun.id}
              testRun={testRun}
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        {selectedTestRun && (
          <>
            <div className="flex flex-col gap-2">
              <TestStatusMenu />
              <TestFilterInput key={testRunId} />
            </div>
            <div className="text-center truncate whitespace-nowrap shrink-0">
              {getTestRunTitle(selectedTestRun)}
            </div>
            <TestRunStats durationMs={durationMs} testRun={selectedTestRun} />
            <div className="overflow-auto -mx-1">
              {Object.values(categorizedTests).map(
                ({ color, count, label, tests }) =>
                  count > 0 ? (
                    <>
                      <div className={`font-bold mx-1 ${color}`}>
                        {count === 1
                          ? `1 ${label} test`
                          : `${count} ${label} tests`}
                      </div>
                      {tests.map((test, index) => (
                        <TestRow
                          currentTestId={testId}
                          key={index}
                          test={test}
                        />
                      ))}
                    </>
                  ) : null
              )}
            </div>
          </>
        )}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        {selectedTest && (
          <>
            <div className="overflow-auto -mx-1">
              {selectedTest.recordings.map((recording, index) => {
                let status: TestSuiteTestStatus;
                switch (selectedTest.status) {
                  case "failed": {
                    status = "failed";
                    break;
                  }
                  case "flaky": {
                    status =
                      index === selectedTest.recordings.length - 1
                        ? "passed"
                        : "flaky";
                    break;
                  }
                  case "passed": {
                    status = "passed";
                    break;
                  }
                }

                return (
                  <RecordingRow
                    key={recording.id}
                    recording={recording}
                    status={status}
                  />
                );
              })}
            </div>
            {/* TODO Errors */}
          </>
        )}
      </div>
    </div>
  );
}
