import { PropsWithChildren } from "react";

export function EmptyLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen flex-row bg-slate-900">
      <main className="flex items-center justify-center grow overflow-auto">
        {children}
      </main>
    </div>
  );
}
