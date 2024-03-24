import { Icon } from "@/components/Icon";
import { HTMLAttributes, KeyboardEvent, MouseEvent } from "react";

export function DropDownTrigger({
  className = "",
  disabled,
  label,
  onClick,
  onKeyDown,
  tabIndex = 0,
  ...rest
}: Omit<HTMLAttributes<HTMLDivElement>, "onClick" | "onKeyDown"> & {
  className?: string;
  disabled?: boolean;
  label: string;
  onClick: (event: MouseEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  tabIndex?: number;
}) {
  return (
    <div
      className={`flex flex-row items-center gap-2 px-2 py-1 outline outline-2 outline-transparent focus:outline-sky-500 bg-slate-950 rounded${className} ${
        disabled ? "opacity-50 cursor-default" : "cursor-pointer"
      }`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      {...rest}
    >
      <div className="grow truncate whitespace-nowrap">{label}</div>
      <Icon className="w-4 h-4" type="drop-down-caret" />
    </div>
  );
}
