import { TestRunStatusMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunStatusMenu";
import { TestRunBranchMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunsBranchMenu";
import { TestRunsDateRangeMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunsDateRangeMenu";
import { TestRunsFilterInput } from "@/app/team/[id]/recordings/TestSuite/TestRunsFilterInput";
import { TestRow } from "@/app/team/[id]/recordings/TestSuite/TestRow";
import { TestRunRow } from "@/app/team/[id]/recordings/TestSuite/TestRunRow";
import { getTestSuiteTests } from "@/graphql/queries/getTestSuiteTests";
import { getTestSuiteTestRuns } from "@/graphql/queries/getTestSuiteTestRuns";
import { filterTest, filterTestRun } from "@/utils/test-runs";
import { TestStatusMenu } from "@/app/team/[id]/recordings/TestSuite/TestStatusMenu";
import { TestFilterInput } from "@/app/team/[id]/recordings/TestSuite/TestFilterInput";
import { getRelativeDate } from "@/utils/date";

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

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2">
      <div className="bg-slate-800 text-white p-1 rounded basis-4/12 overflow-auto flex flex-col gap-1">
        <div className="flex flex-col gap-2 p-1">
          <div className="flex flex-row gap-2 items-center p-1">
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
        <div className="px-1 text-center">
          Failure rate: {Math.round(testRunFailureRate * 100)}%
        </div>
        <div className="overflow-auto">
          {filteredTestRuns.map((testRun) => (
            <TestRunRow
              currentTestRunId={testRunId}
              key={testRun.id}
              testRun={testRun}
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-1">
        <div className="flex flex-col gap-2 p-1">
          <TestStatusMenu />
          <TestFilterInput key={testRunId} />
        </div>
        <div className="overflow-auto">
          {filteredTests?.map((test, index) => (
            <TestRow key={index} test={test} workspaceId={workspaceId} />
          ))}
        </div>
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-1"></div>
    </div>
  );
}
