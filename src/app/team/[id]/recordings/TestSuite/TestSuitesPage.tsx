import { TestRunStatusMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunStatusMenu";
import { TestRunBranchMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunsBranchMenu";
import { TestRunsDateRangeMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunsDateRangeMenu";
import { TestRunsFilterInput } from "@/app/team/[id]/recordings/TestSuite/TestRunsFilterInput";
import { TestRow } from "@/app/team/[id]/recordings/TestSuite/TestRow";
import { TestRunRow } from "@/app/team/[id]/recordings/TestSuite/TestRunRow";
import { getTestSuiteTests } from "@/graphql/queries/getTestSuiteTests";
import { getTestSuiteTestRuns } from "@/graphql/queries/getTestSuiteTestRuns";
import { filterTest, filterTestRun, getTestRunTitle } from "@/utils/test-runs";
import { TestStatusMenu } from "@/app/team/[id]/recordings/TestSuite/TestStatusMenu";
import { TestFilterInput } from "@/app/team/[id]/recordings/TestSuite/TestFilterInput";
import { getRelativeDate } from "@/utils/date";
import { TestRunStats } from "@/app/team/[id]/recordings/TestSuite/TestRunStats";

export async function TestSuitesPage({
  testFilter,
  testRunBranch,
  testRunFilter,
  testRunId,
  testRunStatus,
  testStatus,
  workspaceId,
}: {
  testFilter: string;
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
              {selectedTestRun.numFailed > 0 && (
                <>
                  <div className="font-bold text-red-500 mx-1">
                    {selectedTestRun.numFailed === 1
                      ? "1 Failed test"
                      : `${selectedTestRun.numFailed} Failed tests`}
                  </div>
                  {filteredTests
                    ?.filter((test) => test.status === "failed")
                    ?.map((test, index) => (
                      <TestRow
                        key={index}
                        test={test}
                        workspaceId={workspaceId}
                      />
                    ))}
                </>
              )}
              {selectedTestRun.numFlaky > 0 && (
                <>
                  <div className="font-bold text-yellow-400 mx-1">
                    {selectedTestRun.numFlaky === 1
                      ? "1 Flaky test"
                      : `${selectedTestRun.numFlaky} Flaky tests`}
                  </div>
                  {filteredTests
                    ?.filter((test) => test.status === "flaky")
                    ?.map((test, index) => (
                      <TestRow
                        key={index}
                        test={test}
                        workspaceId={workspaceId}
                      />
                    ))}
                </>
              )}
              {selectedTestRun.numPassed > 0 && (
                <>
                  <div className="font-bold text-green-500 mx-1">
                    {selectedTestRun.numPassed === 1
                      ? "1 Passed test"
                      : `${selectedTestRun.numPassed} Passed tests`}
                  </div>
                  {filteredTests
                    ?.filter((test) => test.status === "passed")
                    ?.map((test, index) => (
                      <TestRow
                        key={index}
                        test={test}
                        workspaceId={workspaceId}
                      />
                    ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-1"></div>
    </div>
  );
}
