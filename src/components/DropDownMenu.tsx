import { DropDownTrigger } from "@/components/DropDownTrigger";
import { HTMLAttributes } from "react";
import { ContextMenuItem, useContextMenu } from "use-context-menu";

type ValueToLabelMap = {
  [value: string]: string;
};

export function DropDownMenu<Options extends ValueToLabelMap>({
  className,
  disabled,
  onChange,
  options,
  value,
  ...rest
}: Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onClick" | "onKeyDown"> & {
  className?: string;
  disabled: boolean;
  onChange: (value: keyof Options) => void;
  options: Options;
  value: keyof Options;
}) {
  const label = options[value] as string;

  const {
    contextMenu,
    onContextMenu: onClick,
    onKeyDown,
  } = useContextMenu(
    Object.entries(options).map(([value, label]) => (
      <ContextMenuItem className="text-sm px-4 py-2" key={value} onSelect={() => onChange(value)}>
        {label}
      </ContextMenuItem>
    )),
    {
      alignTo: "auto-target",
    }
  );

  return (
    <>
      <DropDownTrigger
        className={className}
        disabled={disabled}
        label={label}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...rest}
      />
      {contextMenu}
    </>
  );
}
