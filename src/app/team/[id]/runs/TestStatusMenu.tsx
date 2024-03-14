"use client";

import { DropDownTrigger } from "@/components/DropDownTrigger";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function TestStatusMenu() {
  const [value, setValue, isPending] = useSearchParam("testStatus");

  const showAllRuns = () => {
    setValue("all");
  };

  const showOnlyFailures = () => {
    setValue("failed");
  };

  const label = value === "failed" ? "Failed and flaky" : "All runs";

  const { contextMenu, onContextMenu: onClick } = useContextMenu(
    <>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={showAllRuns}>
        All runs
      </ContextMenuItem>
      <ContextMenuItem
        className="text-sm px-4 py-2"
        onSelect={showOnlyFailures}
      >
        Failed and flaky
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
