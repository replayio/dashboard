"use client";

import { WorkspaceRecording } from "@/graphql/types";
import { MouseEvent } from "react";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function RecordingDropdown({
  recording,
}: {
  recording: WorkspaceRecording;
}) {
  const todo = () => {
    // TODO
  };

  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
    <>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={todo}>
        Rename
      </ContextMenuItem>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={todo}>
        Delete
      </ContextMenuItem>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={todo}>
        Make public
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
        className="w-4 h-4 flex items-center justify-center"
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <svg
          className="w-4 h-4 fill-slate-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>
      {contextMenu}
    </>
  );
}
