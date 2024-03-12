import { LaunchReplayButton } from "@/app/team/[id]/recordings/LaunchReplayButton";
import { LibrarySearch } from "@/app/team/[id]/recordings/LibrarySearch";
import { MountEffects } from "@/app/team/[id]/recordings/MountEffects";
import { Recording } from "@/app/team/[id]/recordings/Recording";
import { ShowMoreRecordingsRow } from "@/app/team/[id]/recordings/ShowMoreRecordingsRow";
import { getNonPendingWorkspacesServer } from "@/graphql/queries/getNonPendingWorkspaces";
import { getPersonalRecordingsServer } from "@/graphql/queries/getPersonalRecordings";
import { getWorkspaceRecordingsServer } from "@/graphql/queries/getWorkspaceRecordings";
import assert from "assert";

export async function RecordingsPage({
  filter,
  id,
  limit,
}: {
  filter: string;
  id: string;
  limit: number;
}) {
  if (id !== "me") {
    const workspaces = await getNonPendingWorkspacesServer();
    const workspace = workspaces.find((workspace) => workspace.id === id);
    assert(workspace, `Workspace "${id}" not found`);
  }

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
        <LibrarySearch numRecordings={totalRecordings} />
        <LaunchReplayButton />
      </div>
      <div className="overflow-auto flex flex-col gap-2">
        <div className="overflow-auto bg-slate-900 text-white rounded flex flex-col gap-px">
          {recordings.map((recording) => (
            <Recording key={recording.uuid} recording={recording} />
          ))}
          <ShowMoreRecordingsRow maxLimit={totalRecordings} />
        </div>
      </div>
      <MountEffects workspaceId={id} />
    </div>
  );
}
