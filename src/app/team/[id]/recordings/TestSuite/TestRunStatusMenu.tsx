"use client";

import { DropDownTrigger } from "@/components/DropDownTrigger";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function TestRunStatusMenu() {
  const [branch, setBranch, isPending] = useSearchParam("status");

  const showAllRuns = () => {
    setBranch("all");
  };

  const showOnlyFailures = () => {
    setBranch("failed");
  };

  const label = branch === "failed" ? "Only failures" : "All runs";

  const { contextMenu, onContextMenu: onClick } = useContextMenu(
    <>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={showAllRuns}>
        All runs
      </ContextMenuItem>
      <ContextMenuItem
        className="text-sm px-4 py-2"
        onSelect={showOnlyFailures}
      >
        Only failures
      </ContextMenuItem>
    </>,
    {
      alignTo: "auto-target",
    }
  );

  return (
    <>
      <DropDownTrigger disabled={isPending} label={label} onClick={onClick} />
      {contextMenu}
    </>
  );
}
