import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideProps } from "@/routes/team/id/getServerSideProps";
import { TestSuiteTestsPage } from "@/routes/team/id/tests/TestSuiteTestsPage";
import { ContextRoot } from "@/routes/team/id/tests/TestsViewContext";

export default function Page({ workspaceId }: { workspaceId: string }) {
  useSyncDefaultWorkspace(workspaceId);

  return (
    <ContextRoot workspaceId={workspaceId}>
      <TestSuiteTestsPage workspaceId={workspaceId} />
    </ContextRoot>
  );
}

export { getServerSideProps };
