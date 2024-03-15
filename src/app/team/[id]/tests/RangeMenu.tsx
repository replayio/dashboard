"use client";

import { DropDownTrigger } from "@/components/DropDownTrigger";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function RangeMenu() {
  const [value, setValue, isPending] = useSearchParam("range");

  const showPastHour = () => {
    setValue("hour");
  };

  const showPastDay = () => {
    setValue("day");
  };

  const showPastWeek = () => {
    setValue("week");
  };

  let label = "";
  switch (value) {
    case "day":
      label = "Last day";
      break;
    case "hour":
      label = "Last hour";
      break;
    case "week":
    default:
      label = "Last 7 days";
      break;
  }

  const { contextMenu, onContextMenu: onClick } = useContextMenu(
    <>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={showPastHour}>
        Last hour
      </ContextMenuItem>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={showPastDay}>
        Last day
      </ContextMenuItem>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={showPastWeek}>
        Last 7 days
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
