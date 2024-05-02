import { SessionContext } from "@/components/SessionContext";
import { WorkspaceRecording } from "@/graphql/types";
import { RecordingRow } from "@/pageComponents/team/id/recordings/RecordingRow";
import { useContext } from "react";

export function FakeRecordingRow() {
  const { user } = useContext(SessionContext);

  return <RecordingRow recording={fakeWorkspaceRecording} user={user} workspaces={[]} />;
}

const fakeWorkspaceRecording: WorkspaceRecording = {
  buildId: "fake-build-id",
  createdAt: new Date(),
  duration: 60_000,
  numComments: 0,
  owner: null,
  private: false,
  title: "Fake recording",
  url: "",
  uuid: "fake-uuid",
  workspaceId: null,
};
