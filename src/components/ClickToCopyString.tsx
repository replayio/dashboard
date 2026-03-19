import { copyText } from "@/utils/copy";
import { ReactNode } from "react";

export function ClickToCopyString({ header, value }: { header?: ReactNode; value: string }) {
  const onClick = () => {
    copyText(value);
  };

  return (
    <div
      className="flex flex-col px-3 py-2 bg-muted hover:bg-accent rounded-md border border-border cursor-pointer shrink-0 text-sm transition-colors"
      onClick={onClick}
    >
      {header}
      <div className="truncate">{value}</div>
    </div>
  );
}
