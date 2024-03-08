import { RecordingThumbnail } from "@/components/RecordingThumbnail";
import { ShowMoreButton } from "@/components/ShowMoreButton";
import { WorkspaceRecording } from "@/graphql/types";
import {
  formatDuration,
  formatNumber,
  formatRelativeTime,
} from "@/utils/number";

export async function Library({
  limit,
  recordings,
}: {
  limit: number;
  recordings: WorkspaceRecording[];
}) {
  const recordingToDisplay = recordings.slice(0, limit);

  return (
    <div className="flex flex-col gap-4 overflow-auto overflow-hidden p-4">
      <div className="text-xl text-white">
        Your library ({formatNumber(recordings.length)})
      </div>
      <div className="overflow-auto flex flex-col gap-2">
        <div className="overflow-auto bg-slate-900 text-white rounded flex flex-col gap-px">
          {recordingToDisplay.map((recording) => (
            <Item key={recording.uuid} recording={recording} />
          ))}
        </div>
        <center>
          <ShowMoreButton maxLimit={recordings.length} />
        </center>
      </div>
    </div>
  );
}

async function Item({ recording }: { recording: WorkspaceRecording }) {
  return (
    <div className="flex flex-row items-center gap-4 px-4 py-2 bg-slate-800">
      <div className="w-16 h-9 bg-slate-900 rounded-sm shrink-0">
        <RecordingThumbnail recordingId={recording.uuid} />
      </div>
      <div className="flex flex-row items-center gap-2 w-full overflow-hidden">
        <div className="flex flex-col grow gap-1 overflow-hidden">
          <div>{recording.title}</div>
          <div className="flex flex-row gap-4 text-sm text-gray-500 whitespace-nowrap">
            <div className="w-16">{formatDuration(recording.duration)}</div>
            <div className="w-16">
              {formatRelativeTime(recording.createdAt)} ago
            </div>
            <div className="shrink truncate">{recording.url}</div>
          </div>
        </div>
        <div className="w-20 shrink-0 truncate">
          {recording.private ? "Private" : "Public"}
        </div>
        <div className="w-36 shrink-0 truncate">
          {recording.owner?.name ?? ""}
        </div>
      </div>
    </div>
  );
}
