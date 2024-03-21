import { NavList } from "@/components/DefaultLayout/NavList";
import { PropsWithChildren } from "react";

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen flex flex-row bg-slate-900">
      <NavList />
      <main className="flex flex-col grow overflow-auto">{children}</main>
    </div>
  );
}
