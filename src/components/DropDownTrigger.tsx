import { Icon } from "@/components/Icon";
import { MouseEvent } from "react";

export function DropDownTrigger({
  disabled,
  label,
  onClick,
}: {
  disabled?: boolean;
  label: string;
  onClick: (event: MouseEvent) => void;
}) {
  return (
    <div
      className={`flex flex-row items-center gap-2 bg-gray-700 px-2 py-1 rounded cursor-pointer hover:bg-gray-600 ${
        disabled ? "opacity-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="grow truncate whitespace-nowrap">{label}</div>
      <Icon className="w-4 h-4" type="drop-down-caret" />
    </div>
  );
}