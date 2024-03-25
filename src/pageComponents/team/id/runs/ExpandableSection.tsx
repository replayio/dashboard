import { IconButton } from "@/components/IconButton";
import { PropsWithChildren, ReactNode, useState } from "react";

export function ExpandableSection({
  children,
  label,
  openByDefault = false,
}: PropsWithChildren<{
  label: ReactNode;
  openByDefault?: boolean;
}>) {
  const [open, setOpen] = useState(openByDefault);

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <div className="truncate grow font-bold">{label}</div>
        <IconButton
          data-test-name="ExpandableSection-ToggleButton"
          iconType={open ? "drop-down-caret-down" : "drop-down-caret-left"}
          onClick={() => setOpen(!open)}
        />
      </div>
      {open && (
        <>
          <div className="h-2"></div>
          {children}
        </>
      )}
    </>
  );
}
