import { PropsWithChildren } from "react";

export function Message({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`bg-slate-800 text-white flex flex-col gap-4 items-center p-4 rounded-lg shadow ${className}`}
    >
      {children}
    </div>
  );
}
