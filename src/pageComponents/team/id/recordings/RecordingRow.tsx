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
      className="flex flex-row items-center gap-5 px-5 py-3.5 hover:bg-accent/60 text-foreground transition-colors border-b border-border last:border-b-0 group"
      data-test-name="RecordingRow"
      href={href}
    >
      <div className="w-20 h-11 bg-muted rounded-md shrink-0 overflow-hidden border border-border">
        <RecordingThumbnail buildId={recording.buildId} recordingId={recording.uuid} />
      </div>
      <div className="flex flex-col grow gap-1 truncate min-w-0">
        <div className="truncate text-sm font-medium group-hover:text-foreground">
          {recording.title}
        </div>
        <div className="flex flex-row gap-5 text-xs text-muted-foreground whitespace-nowrap">
          <div className="flex flex-row gap-1.5 items-center shrink-0">
            <Icon className="w-3 h-3" type="clock" />
            {formatDuration(recording.duration)}
          </div>
          <div className="flex flex-row gap-1.5 items-center shrink-0" suppressHydrationWarning>
            <Icon className="w-3 h-3" type="calendar" />
            {formatRelativeTime(recording.createdAt)} ago
          </div>
          <div className="shrink truncate opacity-70">{recording.url}</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-4 shrink-0">
        <div
          className="text-muted-foreground"
          title={recording.private ? "Private recording" : "Public recording"}
        >
          <Icon
            className="w-4 h-4"
            type={recording.private ? "visibility-private" : "visibility-public"}
          />
        </div>
        <div className="w-24 truncate text-xs text-muted-foreground text-right hidden md:block">
          {recording.owner?.name ?? ""}
        </div>
        {recording.numComments > 0 && (
          <div className="flex flex-row items-center gap-1 text-muted-foreground text-xs">
            <div>{recording.numComments}</div>
            <Icon className="w-3.5 h-3.5" type="comment" />
          </div>
        )}
        <div className="w-5">
          <RecordingDropdown recording={recording} user={user} workspaces={workspaces} />
        </div>
      </div>
    </Link>
  );
}
