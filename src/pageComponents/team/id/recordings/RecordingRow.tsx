import { Icon } from "@/components/Icon";
import { User, Workspace, WorkspaceRecording } from "@/graphql/types";
import { RecordingDropdown } from "@/pageComponents/team/id/recordings/RecordingDropdown";
import { RecordingThumbnail } from "@/pageComponents/team/id/recordings/RecordingThumbnail";
import { formatDuration, formatRelativeTime } from "@/utils/number";
import { getURL } from "@/utils/recording";
import Link from "next/link";

export function RecordingRow({
  recording,
  user,
  workspaces,
}: {
  recording: WorkspaceRecording;
  user: User;
  workspaces: Workspace[];
}) {
  const href = getURL(recording.uuid, recording.buildId);

  return (
    <Link
      className="flex flex-row items-center gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white"
      data-test-name="RecordingRow"
      href={href}
    >
      <div className="w-16 h-9 bg-slate-900 rounded-sm shrink-0">
        <RecordingThumbnail buildId={recording.buildId} recordingId={recording.uuid} />
      </div>
      <div className="flex flex-row items-center gap-2 w-full truncate">
        <div className="flex flex-col grow gap-1 truncate">
          <div className="truncate">{recording.title}</div>
          <div className="flex flex-row gap-4 text-sm text-gray-500 whitespace-nowrap">
            <div className="w-16 flex flex-row gap-1 items-center shrink-0">
              <Icon className="w-3 h-3" type="clock" />
              {formatDuration(recording.duration)}
            </div>
            <div
              className="w-20 flex flex-row gap-1 items-center shrink-0"
              suppressHydrationWarning
            >
              <Icon className="w-3 h-3" type="calendar" />
              {formatRelativeTime(recording.createdAt)} ago
            </div>
            <div className="shrink truncate">{recording.url}</div>
          </div>
        </div>
        <div
          className="w-5 shrink-0 truncate text-sm"
          title={recording.private ? "Private recording" : "Public recording"}
        >
          <Icon
            className={`w-5 h-5 ${recording.private ? "text-slate-500" : ""}`}
            type={recording.private ? "visibility-private" : "visibility-public"}
          />
        </div>
        <div className="w-16 md:w-36 shrink-0 truncate text-sm text-center">
          {recording.owner?.name ?? ""}
        </div>
        <div className="w-10 shrink-0 flex flex-row items-center gap-1">
          {recording.numComments > 0 && (
            <>
              <div>{recording.numComments}</div>
              <Icon className="w-4 h-4" type="comment" />
            </>
          )}
        </div>
        <div className="w-6 shrink-0">
          <RecordingDropdown recording={recording} user={user} workspaces={workspaces} />
        </div>
      </div>
    </Link>
  );
}
