import { IconButton } from "@/components/IconButton";
import { WorkspaceRecording } from "@/graphql/types";
import { DeleteDialog } from "@/pageComponents/team/id/recordings/DeleteDialog";
import { ShareDialog } from "@/pageComponents/team/id/recordings/ShareDialog";
import { MouseEvent, useState } from "react";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function RecordingDropdown({
  recording,
}: {
  recording: WorkspaceRecording;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const onDelete = () => {
    setShowDeleteDialog(true);
  };

  const onDismissShareDialog = () => {
    setShowDeleteDialog(false);
    setShowShareDialog(false);
  };

  const onShare = () => {
    setShowShareDialog(true);
  };

  const { contextMenu, onContextMenu } = useContextMenu(
    <>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={onShare}>
        Share
      </ContextMenuItem>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={onDelete}>
        Delete
      </ContextMenuItem>
    </>
  );

  const onClick = (event: MouseEvent) => {
    onContextMenu(event);
    event.preventDefault();
  };

  return (
    <>
      <IconButton onClick={onClick} iconType="vertical-dots" />
      {contextMenu}
      {showDeleteDialog && (
        <DeleteDialog onDismiss={onDismissShareDialog} recording={recording} />
      )}
      {showShareDialog && (
        <ShareDialog onDismiss={onDismissShareDialog} recording={recording} />
      )}
    </>
  );
}
