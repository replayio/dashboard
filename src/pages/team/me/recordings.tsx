import { usePersonalRecordings } from "@/graphql/queries/usePersonalRecordings";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import RecordingPage from "@/pageComponents/team/id/recordings/RecordingsPage";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";

export default function Page() {
  useSyncDefaultWorkspace();

  const { isLoading, recordings: allRecordings } = usePersonalRecordings();

  return <RecordingPage isLoading={isLoading} recordings={allRecordings} />;
}

Page.Layout = TeamLayout;
