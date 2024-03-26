import { NavList } from "@/pageComponents/team/layout/NavList";
import { ComponentType, PropsWithChildren } from "react";

export function TeamLayout({
  children,
  NavComponent = NavList,
}: PropsWithChildren<{
  NavComponent?: ComponentType<PropsWithChildren>;
}>) {
  return (
    <div className="h-screen w-screen flex flex-row bg-slate-900">
      <NavComponent />
      <main className="flex flex-col grow overflow-auto">{children}</main>
    </div>
  );
}
