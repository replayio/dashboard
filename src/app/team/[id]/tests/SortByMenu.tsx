"use client";

import { DropDownTrigger } from "@/components/DropDownTrigger";
import { useSearchParam } from "@/hooks/useSearchParam";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

export function SortByMenu() {
  const [value, setValue, isPending] = useSearchParam("sortBy");

  const sortByFailureRate = () => {
    setValue("failure-rate");
  };

  const sortByFlakyRate = () => {
    setValue("flaky-rate");
  };

  const sortAlphabetically = () => {
    setValue("alphabetically");
  };

  let label = "";
  switch (value) {
    case "flaky-rate":
      label = "Sort by flaky rate";
      break;
    case "alphabetically":
      label = "Sort alphabetically";
      break;
    case "failure-rate":
    default:
      label = "Sort by failure rate";
      break;
  }

  const { contextMenu, onContextMenu: onClick } = useContextMenu(
    <>
      <ContextMenuItem
        className="text-sm px-4 py-2"
        onSelect={sortByFailureRate}
      >
        Sort by failure rate
      </ContextMenuItem>
      <ContextMenuItem className="text-sm px-4 py-2" onSelect={sortByFlakyRate}>
        Sort by flaky rate
      </ContextMenuItem>
      <ContextMenuItem
        className="text-sm px-4 py-2"
        onSelect={sortAlphabetically}
      >
        Sort alphabetically
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
