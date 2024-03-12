import { copyText } from "@/utils/copy";
import { ReactNode } from "react";

export function ClickToCopyString({
  header,
  value,
}: {
  header?: ReactNode;
  value: string;
}) {
  const onClick = () => {
    copyText(value);
  };

  return (
    <div
      className="flex flex-col px-2 py-1 bg-slate-900 hover:bg-slate-950 rounded cursor-pointer shrink-0"
      onClick={onClick}
    >
      {header}
      <div className="truncate">{value}</div>
    </div>
  );
}
