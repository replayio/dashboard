import { RecordingThumbnail } from "@/app/team/[id]/recordings/RecordingThumbnail";
import { WorkspaceRecording } from "@/graphql/types";
import { formatDuration, formatRelativeTime } from "@/utils/number";

export function Recording({ recording }: { recording: WorkspaceRecording }) {
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
