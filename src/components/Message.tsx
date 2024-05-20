import { HTMLAttributes, PropsWithChildren } from "react";

export function Message({
  children,
  className = "",
  ...rest
}: PropsWithChildren<{ className?: string }> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-slate-800 text-white flex flex-col gap-4 items-center p-4 rounded-lg shadow-lg ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
