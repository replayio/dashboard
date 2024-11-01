import { PropsWithChildren } from "react";

export function VerticalLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen flex flex-row bg-slate-900 text-white">
      <main className="flex flex-col  grow overflow-auto h-screen w-screen">{children}</main>
    </div>
  );
}
