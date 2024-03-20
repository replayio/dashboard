import { usePersonalRecordings } from "@/graphql/queries/usePersonalRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import RecordingPage from "@/routes/team/id/recordings/RecordingsPage";

export default function Page() {
  useSyncDefaultWorkspace();

  // TODO GraphQL queries should be pulling down only the data we need
  const { isLoading, recordings: allRecordings } = usePersonalRecordings();

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}
