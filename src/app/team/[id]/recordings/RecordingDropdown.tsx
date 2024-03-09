"use client";

import { DeleteDialog } from "@/app/team/[id]/recordings/DeleteDialog";
import { ShareDialog } from "@/app/team/[id]/recordings/ShareDialog";
import { Icon } from "@/components/Icon";
import { WorkspaceRecording } from "@/graphql/types";
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

  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
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
      <button
        className="bg-white/10 hover:bg-white/20 p-1 rounded transition"
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <Icon className="w-4 h-4 fill-slate-300" type="vertical-dots" />
      </button>
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
