import { TestRunTests } from "@/pageComponents/team/id/runs/TestRunTests";
import TestRuns from "@/pageComponents/team/id/runs/TestRuns";
import { RunsViewContext } from "@/pageComponents/team/id/runs/TestRunsContext";
import { TestsAndExecutions } from "@/pageComponents/team/id/runs/TestsAndExecutions";
import { useContext } from "react";

export function TestSuiteRunsPage() {
  const {
    selectedTestId,
    selectedTestRunId,
    selectTest,
    selectTestRun,
    testRuns,
  } = useContext(RunsViewContext);

  const selectedTestRun = testRuns?.find(
    (testRun) => testRun.id === selectedTestRunId
  );

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2 h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2 relative">
        <TestRuns
          selectedTestRunId={selectedTestRunId}
          selectTestRun={selectTestRun}
        />
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2 relative">
        {selectedTestRun != null ? (
          <TestRunTests
            selectedTestId={selectedTestId}
            selectedTestRun={selectedTestRun}
            selectTest={selectTest}
          />
        ) : testRuns && testRuns.length > 0 ? (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a run to see its details here
          </div>
        ) : null}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2 relative">
        {selectedTestId != null && selectedTestRun != null ? (
          <TestsAndExecutions selectedTestId={selectedTestId} />
        ) : selectedTestRun ? (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a test to see its details here
          </div>
        ) : null}
      </div>
    </div>
  );
}
