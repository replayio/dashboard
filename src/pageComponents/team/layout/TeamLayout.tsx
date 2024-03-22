import { NavList } from "@/pageComponents/team/layout/NavList";
import { PropsWithChildren } from "react";

export function TeamLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen flex flex-row bg-slate-900 p-2 gap-2">
      <NavList />
      <main className="flex flex-col grow overflow-auto">{children}</main>
    </div>
  );
}
