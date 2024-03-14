"use client";

import { DropDownTrigger } from "@/components/DropDownTrigger";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function TestRunBranchMenu() {
  const [value, setValue, isPending] = useSearchParam("testRunBranch");

  const showAllBranches = () => {
    setValue("all");
  };

  const showOnlyPrimaryBranch = () => {
    setValue("primary");
  };

  const label = value === "primary" ? "Only primary branch" : "All branches";

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