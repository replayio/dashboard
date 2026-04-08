import { IconButton } from "@/components/IconButton";
import { User, Workspace, WorkspaceRecording } from "@/graphql/types";
import { DeleteDialog } from "@/pageComponents/team/id/recordings/DeleteDialog";
import { RenameDialog } from "@/pageComponents/team/id/recordings/RenameDialog";
import { ShareDialog } from "@/pageComponents/team/id/recordings/ShareDialog";
import { canDeleteRecording } from "@/utils/user";
import { MouseEvent, useState } from "react";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

type DialogKind = "delete" | "rename" | "share" | null;

export function RecordingDropdown({
  recording,
  user,
  workspaces,
}: {
  recording: WorkspaceRecording;
  user: User;
  workspaces: Workspace[];
}) {
  const [openDialog, setOpenDialog] = useState<DialogKind>(null);

  const onDismiss = () => setOpenDialog(null);

  const canDelete = canDeleteRecording(recording, user.id, workspaces);

  const { contextMenu, onContextMenu } = useContextMenu(
    <>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={() => setOpenDialog("rename")}>
        Rename
      </ContextMenuItem>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={() => setOpenDialog("share")}>
        Share
      </ContextMenuItem>
      {canDelete && (
        <ContextMenuItem className="text-sm px-4 py-2" onSelect={() => setOpenDialog("delete")}>
          Delete
        </ContextMenuItem>
      )}
    </>
  );

  const onClick = (event: MouseEvent) => {
    onContextMenu(event);
    event.preventDefault();
  };

  return (
    <>
      <IconButton
        data-test-name="recording-row-drop-down-trigger"
        onClick={onClick}
        iconType="vertical-dots"
      />
      {contextMenu}
      {openDialog === "delete" && <DeleteDialog onDismiss={onDismiss} recording={recording} />}
      {openDialog === "rename" && <RenameDialog onDismiss={onDismiss} recording={recording} />}
      {openDialog === "share" && (
        <ShareDialog onDismiss={onDismiss} recording={recording} workspaces={workspaces} />
      )}
    </>
  );
}
