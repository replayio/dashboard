import { useWorkspaceRecordings } from "@/graphql/queries/useWorkspaceRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSideProps } from "@/routes/team/id/getServerSideProps";
import RecordingPage from "@/routes/team/id/recordings/RecordingsPage";

export default function Page({ workspaceId }: { workspaceId: string }) {
  useSyncDefaultWorkspace();

  // TODO GraphQL queries should be pulling down only the data we need
  const { isLoading, recordings: allRecordings } =
    useWorkspaceRecordings(workspaceId);

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}

export { getServerSideProps };
