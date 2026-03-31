import { Icon } from "@/components/Icon";
import { User, Workspace, WorkspaceRecording } from "@/graphql/types";
import { RecordingDropdown } from "@/pageComponents/team/id/recordings/RecordingDropdown";
import { RecordingThumbnail } from "@/pageComponents/team/id/recordings/RecordingThumbnail";
import { formatDuration, formatRelativeTime } from "@/utils/number";
import { getURL } from "@/utils/recording";
import Link from "next/link";
import { flushSync } from "react-dom";

export function RecordingRow({
  recording,
  user,
  workspaces,
  navigationPendingUuid,
  onNavigationIntent,
}: {
  recording: WorkspaceRecording;
  user: User;
  workspaces: Workspace[];
  navigationPendingUuid: string | null;
  onNavigationIntent: (recordingUuid: string) => void;
}) {
  const href = getURL(recording.uuid, recording.buildId);
  const listLocked = navigationPendingUuid !== null;
  const isOpeningThis = navigationPendingUuid === recording.uuid;
  // Never put pointer-events-none on the row being opened: it runs after pointerdown but before
  // click, which prevents the link's default navigation from firing.
  const lockedRowClass = listLocked
    ? isOpeningThis
      ? "bg-accent/40 opacity-100"
      : "pointer-events-none opacity-40"
    : "";

  return (
    <Link
      className={`flex flex-row items-center gap-5 px-5 py-3.5 hover:bg-accent/60 text-foreground transition-colors border-b border-border last:border-b-0 group ${lockedRowClass}`}
      data-test-name="RecordingRow"
      href={href}
      onPointerDown={e => {
        if (listLocked) {
          e.preventDefault();
          return;
        }
        if (e.button !== 0) return;
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        if ((e.target as HTMLElement).closest("[data-recording-row-menu]")) return;
        flushSync(() => onNavigationIntent(recording.uuid));
      }}
    >
      <div className="w-20 h-11 bg-muted rounded-md shrink-0 overflow-hidden border border-border">
        <RecordingThumbnail buildId={recording.buildId} recordingId={recording.uuid} />
      </div>
      <div className="flex flex-col grow gap-1 truncate min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-sm font-medium group-hover:text-foreground">
            {recording.title}
          </span>
          {isOpeningThis && (
            <Icon className="h-4 w-4 shrink-0 animate-spin text-primary" type="loading-spinner" />
          )}
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
        <div className="w-5" data-recording-row-menu>
          <RecordingDropdown recording={recording} user={user} workspaces={workspaces} />
        </div>
      </div>
    </Link>
  );
}
