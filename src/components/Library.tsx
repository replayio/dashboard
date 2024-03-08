import { WorkspaceRecording } from "@/graphql/types";

export async function Library({
  recordings,
}: {
  recordings: WorkspaceRecording[];
}) {
  return (
    <>
      <h1 className="text-white">Your library ({recordings.length})</h1>
      <div className="h-full w-full bg-slate-800 text-white rounded">
        {recordings.map((recording) => (
          <div key={recording.uuid}>{recording.title}</div>
        ))}
      </div>
    </>
  );
}
