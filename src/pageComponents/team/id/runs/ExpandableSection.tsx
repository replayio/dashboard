import classnames from "classnames";
import { IconButton } from "@/components/IconButton";
import { PropsWithChildren, ReactNode, useState } from "react";

export function ExpandableSection({
  children,
  label,
  openByDefault = false,
  grow = true,
}: PropsWithChildren<{
  label: ReactNode;
  grow?: boolean;
  openByDefault?: boolean;
}>) {
  const [open, setOpen] = useState(openByDefault);

  const labelClassname = classnames("truncate font-bold", {
    grow,
  });

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <div className={labelClassname}>{label}</div>
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
