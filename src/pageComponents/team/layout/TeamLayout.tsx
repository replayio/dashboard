import { TeamNavComponent } from "@/pageComponents/team/layout/TeamNavComponent";
import { ComponentType, PropsWithChildren } from "react";

export function TeamLayout({
  children,
  NavComponent = TeamNavComponent,
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
