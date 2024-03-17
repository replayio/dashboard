import { TestRunTests } from "@/pages/team/[id]/runs/TestRunTests";
import TestRuns from "@/pages/team/[id]/runs/TestRuns";
import { RunsViewContext } from "@/pages/team/[id]/runs/TestRunsContext";
import { TestsAndExecutions } from "@/pages/team/[id]/runs/TestsAndExecutions";
import { useContext } from "react";

export function TestSuiteRunsPage() {
  const { selectedTestId, selectedTestRunId, selectTest, selectTestRun } =
    useContext(RunsViewContext);

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2 h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        <TestRuns
          selectedTestRunId={selectedTestRunId}
          selectTestRun={selectTestRun}
        />
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        {selectedTestRunId != null ? (
          <TestRunTests
            selectedTestId={selectedTestId}
            selectedTestRunId={selectedTestRunId}
            selectTest={selectTest}
          />
        ) : (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a run to see its details here
          </div>
        )}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        {selectedTestId != null && selectedTestRunId != null ? (
          <TestsAndExecutions selectedTestId={selectedTestId} />
        ) : selectedTestRunId ? (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a test to see its details here
          </div>
        ) : null}
      </div>
    </div>
  );
}
