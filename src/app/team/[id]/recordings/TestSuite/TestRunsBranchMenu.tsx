"use client";

import { DropDownTrigger } from "@/components/DropDownTrigger";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function TestRunBranchMenu() {
  const [branch, setBranch, isPending] = useSearchParam("branch");

  const showAllBranches = () => {
    setBranch("all");
  };

  const showOnlyPrimaryBranch = () => {
    setBranch("primary");
  };

  const label = branch === "primary" ? "Only primary branch" : "All branches";

  const { contextMenu, onContextMenu: onClick } = useContextMenu(
    <>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={showAllBranches}>
        All branches
      </ContextMenuItem>
      <ContextMenuItem
        className="text-sm px-4 py-2"
        onSelect={showOnlyPrimaryBranch}
      >
        Only primary branch
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
