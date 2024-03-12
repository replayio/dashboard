import { TestSuiteRun } from "@/app/team/[id]/recordings/TestSuiteRun";
import { TestSuiteRuns } from "@/app/team/[id]/recordings/TestSuiteRuns";
import { getTestSuiteTestRunRecordings } from "@/graphql/queries/getTestSuiteTestRunRecordings";
import { getTestSuiteTestRuns } from "@/graphql/queries/getTestSuiteTestRuns";

export async function TestSuitesPage({
  testRunId,
  workspaceId,
}: {
  testRunId: string | null;
  workspaceId: string;
}) {
  const testRuns = await getTestSuiteTestRuns(workspaceId);
  const testRunWithRecordings = testRunId
    ? await getTestSuiteTestRunRecordings(workspaceId, testRunId)
    : null;

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2">
      <div className="bg-slate-800 text-white p-1 rounded basis-4/12 overflow-auto flex flex-col gap-1">
        {testRuns.map((testRun) => (
          <TestSuiteRuns
            currentTestRunId={testRunId}
            key={testRun.id}
            testRun={testRun}
            workspaceId={workspaceId}
          />
        ))}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-1">
        {testRunWithRecordings?.map((test, index) => (
          <TestSuiteRun key={index} test={test} workspaceId={workspaceId} />
        ))}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-1"></div>
    </div>
  );
}
