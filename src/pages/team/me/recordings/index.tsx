import { usePersonalRecordings } from "@/graphql/queries/usePersonalRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import RecordingPage from "@/pages/team/[id]/recordings/RecordingsPage";

export default function Page() {
  // TODO GraphQL queries should be pulling down only the data we need
  const { isLoading, recordings: allRecordings } = usePersonalRecordings();

  useSyncDefaultWorkspace("me");

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}
