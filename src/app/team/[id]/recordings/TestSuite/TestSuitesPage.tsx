import { TestRunStatusMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunStatusMenu";
import { TestRunBranchMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunsBranchMenu";
import { TestRunsDateRangeMenu } from "@/app/team/[id]/recordings/TestSuite/TestRunsDateRangeMenu";
import { TestRunsFilterInput } from "@/app/team/[id]/recordings/TestSuite/TestRunsFilterInput";
import { TestSuiteRunWithRecordingsRow } from "@/app/team/[id]/recordings/TestSuite/TestSuiteRunWithRecordingsRow";
import { TestSuiteRunsRow } from "@/app/team/[id]/recordings/TestSuite/TestSuiteRunsRow";
import { getTestSuiteTestRunRecordings } from "@/graphql/queries/getTestSuiteTestRunRecordings";
import { getTestSuiteTestRuns } from "@/graphql/queries/getTestSuiteTestRuns";
import { filterTestRun } from "@/utils/test-runs";

export async function TestSuitesPage({
  branch,
  filter,
  status,
  testRunId,
  workspaceId,
}: {
  branch: string;
  filter: string;
  status: string;
  testRunId: string | null;
  workspaceId: string;
}) {
  const testRuns = await getTestSuiteTestRuns(workspaceId);
  const testRunWithRecordings = testRunId
    ? await getTestSuiteTestRunRecordings(workspaceId, testRunId)
    : null;

  const filteredTestRuns = testRuns.filter((testRun) =>
    filterTestRun(testRun, {
      branch,
      status,
      text: filter,
    })
  );
  console.log("filteredTestRuns by", { branch, status });

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
        <div className="overflow-auto">
          {filteredTestRuns.map((testRun) => (
            <TestSuiteRunsRow
              currentTestRunId={testRunId}
              key={testRun.id}
              testRun={testRun}
              workspaceId={workspaceId}
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-1">
        {testRunWithRecordings?.map((test, index) => (
          <TestSuiteRunWithRecordingsRow
            key={index}
            test={test}
            workspaceId={workspaceId}
          />
        ))}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-1"></div>
    </div>
  );
}
