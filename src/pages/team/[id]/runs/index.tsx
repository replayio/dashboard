import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { useWorkspaceIdFromUrl } from "@/hooks/useWorkspaceIdFromUrl";
import { TestRunTests } from "@/pages/team/[id]/runs/TestRunTests";
import TestRuns from "@/pages/team/[id]/runs/TestRuns";
import { TestsAndExecutions } from "@/pages/team/[id]/runs/TestsAndExecutions";
import { useCallback, useState } from "react";

export default function TestSuiteRunsPage() {
  const workspaceId = useWorkspaceIdFromUrl();

  useSyncDefaultWorkspace(workspaceId);

  const [selectedTestRunId, setSelectedTestRunId] = useState<string | null>(
    null
  );
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  const setSelectedTestRunWrapper = useCallback((id: string) => {
    setSelectedTestRunId(id);
    setSelectedTestId(null);
  }, []);

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2 h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        <TestRuns
          selectedTestRunId={selectedTestRunId}
          selectTestRun={setSelectedTestRunWrapper}
          workspaceId={workspaceId}
        />
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        {selectedTestRunId ? (
          <TestRunTests
            selectedTestId={selectedTestId}
            selectedTestRunId={selectedTestRunId}
            selectTest={setSelectedTestId}
            workspaceId={workspaceId}
          />
        ) : (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a run to see its details here
          </div>
        )}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        {selectedTestId && selectedTestRunId ? (
          <TestsAndExecutions
            selectedTestId={selectedTestId}
            selectedTestRunId={selectedTestRunId}
            workspaceId={workspaceId}
          />
        ) : selectedTestRunId ? (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a test to see its details here
          </div>
        ) : null}
      </div>
    </div>
  );
}
