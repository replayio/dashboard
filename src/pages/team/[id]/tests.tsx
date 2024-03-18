import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { useWorkspaceIdFromUrl } from "@/hooks/useWorkspaceIdFromUrl";
import { TestSuiteTestsPage } from "@/routes/team/id/tests/TestSuiteTestsPage";
import { ContextRoot } from "@/routes/team/id/tests/TestsViewContext";

export default function Page() {
  const workspaceId = useWorkspaceIdFromUrl();

  useSyncDefaultWorkspace(workspaceId);

  return (
    <ContextRoot key={workspaceId} workspaceId={workspaceId}>
      <TestSuiteTestsPage workspaceId={workspaceId} />
    </ContextRoot>
  );
}
