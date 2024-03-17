import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { useWorkspaceIdFromUrl } from "@/hooks/useWorkspaceIdFromUrl";
import { ContextRoot } from "@/pages/team/[id]/runs/TestRunsContext";
import { TestSuiteRunsPage } from "@/pages/team/[id]/runs/TestSuiteRunsPage";

export default function Page() {
  const workspaceId = useWorkspaceIdFromUrl();

  useSyncDefaultWorkspace(workspaceId);

  return (
    <ContextRoot key={workspaceId} workspaceId={workspaceId}>
      <TestSuiteRunsPage />
    </ContextRoot>
  );
}
