import { DefaultNav } from "@/components/layout/DefaultNav";
import { ComponentType, PropsWithChildren } from "react";
import { MainWithSidebar } from "./MainWithSidebar";

export function DefaultLayout({
  children,
  NavComponent = DefaultNav,
}: PropsWithChildren<{
  NavComponent?: ComponentType<PropsWithChildren>;
}>) {
  return (
    <div className="h-screen w-screen flex flex-row bg-background text-foreground">
      <NavComponent />
      <MainWithSidebar className="flex flex-col grow overflow-auto">{children}</MainWithSidebar>
    </div>
  );
}
