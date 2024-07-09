import { PropsWithChildren } from "react";

export function EmptyLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen flex flex-row bg-slate-900 text-white">
      <main className="flex items-center justify-center grow overflow-auto">{children}</main>
    </div>
  );
}
