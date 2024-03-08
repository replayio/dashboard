import { WorkspaceRecording } from "@/graphql/types";

export async function Library({
  recordings,
}: {
  recordings: WorkspaceRecording[];
}) {
  return (
    <div>
      {recordings.map((recording) => (
        <div key={recording.uuid}>{recording.title}</div>
      ))}
    </div>
  );
}
