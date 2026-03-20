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
      className={`flex flex-row items-center gap-2 px-3 py-2 rounded-md border border-input bg-background text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${className} ${
        disabled ? "opacity-50 cursor-default" : "cursor-pointer hover:border-ring"
      }`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      {...rest}
    >
      <div className="grow truncate whitespace-nowrap text-sm">{label}</div>
      <Icon className="w-4 h-4 text-muted-foreground" type="drop-down-caret" />
    </div>
  );
}
