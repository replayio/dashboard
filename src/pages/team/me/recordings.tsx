import { usePersonalRecordings } from "@/graphql/queries/usePersonalRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import RecordingPage from "@/routes/team/id/recordings/RecordingsPage";

export default function Page() {
  useSyncDefaultWorkspace();

  const { isLoading, recordings: allRecordings } = usePersonalRecordings();

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}
