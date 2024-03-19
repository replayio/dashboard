import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideProps } from "@/routes/team/id/getServerSideProps";
import { ContextRoot } from "@/routes/team/id/runs/TestRunsContext";
import { TestSuiteRunsPage } from "@/routes/team/id/runs/TestSuiteRunsPage";

export default function Page({ workspaceId }: { workspaceId: string }) {
  useSyncDefaultWorkspace(workspaceId);

  return (
    <ContextRoot key={workspaceId} workspaceId={workspaceId}>
      <TestSuiteRunsPage />
    </ContextRoot>
  );
}

export { getServerSideProps };
