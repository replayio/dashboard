"use client";

import { DropDownTrigger } from "@/components/DropDownTrigger";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function TestRunsDateRangeMenu() {
  const showAllRuns = () => {
    // TODO
  };

  const showOnlyFailures = () => {
    // TODO
  };

  // TODO useSearchParams

  const { contextMenu, onContextMenu: onClick } = useContextMenu(
    <>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={noop}>
        Last 7 days
      </ContextMenuItem>
    </>,
    {
      alignTo: "auto-target",
    }
  );

  return (
    <>
      <DropDownTrigger label="Last 7 days" onClick={onClick} />
      {contextMenu}
    </>
  );
}

function noop() {}
