import { useWorkspaceRecordings } from "@/graphql/queries/useWorkspaceRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { useWorkspaceIdFromUrl } from "@/hooks/useWorkspaceIdFromUrl";
import RecordingPage from "@/routes/team/id/recordings/RecordingsPage";

export default function Page() {
  const workspaceId = useWorkspaceIdFromUrl();

  // TODO GraphQL queries should be pulling down only the data we need
  const { isLoading, recordings: allRecordings } =
    useWorkspaceRecordings(workspaceId);

  useSyncDefaultWorkspace(workspaceId);

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}
