import { MountEffects } from "@/app/team/[id]/recordings/MountEffects";
import { LaunchReplayButton } from "@/app/team/[id]/recordings/Recordings/LaunchReplayButton";
import { LibrarySearchInput } from "@/app/team/[id]/recordings/Recordings/LibrarySearchInput";
import { RecordingRow } from "@/app/team/[id]/recordings/Recordings/RecordingRow";
import { ShowMoreRecordingsRow } from "@/app/team/[id]/recordings/Recordings/ShowMoreRecordingsRow";
import { getPersonalRecordingsServer } from "@/graphql/queries/getPersonalRecordings";
import { getWorkspaceRecordingsServer } from "@/graphql/queries/getWorkspaceRecordings";

export async function RecordingsPage({
  filter,
  id,
  limit,
}: {
  filter: string;
  id: string;
  limit: number;
}) {
  // TODO GraphQL queries should be pulling down only the data we need;
  // else we risk wasting bandwidth (and exceeding NextJS's 2MB cache limit)
  const allRecordings =
    id === "me"
      ? await getPersonalRecordingsServer(filter)
      : await getWorkspaceRecordingsServer(id, filter);

  const recordings = allRecordings.slice(0, limit);
  const totalRecordings = allRecordings.length;

  return (
    <div className="flex flex-col gap-2 overflow-auto overflow-hidden p-2">
      <div className="flex flex-row items-center gap-2 justify-between">
        <LibrarySearchInput numRecordings={totalRecordings} />
        <LaunchReplayButton />
      </div>
      <div className="overflow-auto flex flex-col gap-2">
        <div className="overflow-auto bg-slate-900 text-white rounded flex flex-col gap-px">
          {recordings.map((recording) => (
            <RecordingRow key={recording.uuid} recording={recording} />
          ))}
          <ShowMoreRecordingsRow maxLimit={totalRecordings} />
          {recordings.length === 0 && (
            <div>No recordings have been uploaded yet.</div>
          )}
        </div>
      </div>
      <MountEffects workspaceId={id} />
    </div>
  );
}
