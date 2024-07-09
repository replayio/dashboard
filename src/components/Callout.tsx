import { Icon, IconType } from "@/components/Icon";
import { ReactNode } from "react";

type Type = "error" | "info" | "warning";

export function Callout({
  bodyText,
  headerText,
  type,
}: {
  bodyText: ReactNode;
  headerText: ReactNode;
  type: Type;
}) {
  let className: string;
  let iconType: IconType;
  switch (type) {
    case "error":
      className = "text-red-500";
      iconType = "error";
      break;
    case "info":
      className = "text-sky-500";
      iconType = "info";
      break;
    case "warning":
      className = "text-yellow-400";
      iconType = "warning";
      break;
  }

  return (
    <div className="flex flex-col rounded-md px-3 py-2 bg-slate-800">
      <div className={`flex flex-row items-center gap-2 font-bold ${className}`}>
        <Icon className="w-5 h-5" type={iconType} />
        {headerText}
      </div>
      <div className="flex flex-row items-center gap-2 text-slate-300 text-sm">
        <div className="w-5 h-5"></div>
        {bodyText}
      </div>
    </div>
  );
}
