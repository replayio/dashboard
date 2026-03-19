import { HTMLAttributes, PropsWithChildren } from "react";

export function Message({
  children,
  className = "",
  ...rest
}: PropsWithChildren<{ className?: string }> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-card text-card-foreground border border-border flex flex-col gap-4 items-center p-4 rounded-xl shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
