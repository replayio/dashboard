import { DefaultNav } from "@/components/layout/DefaultNav";
import { ComponentType, PropsWithChildren } from "react";

export function DefaultLayout({
  children,
  NavComponent = DefaultNav,
}: PropsWithChildren<{
  NavComponent?: ComponentType<PropsWithChildren>;
}>) {
  return (
    <div className="h-screen w-screen flex flex-row bg-background text-foreground">
      <NavComponent />
      <main className="flex flex-col grow overflow-auto">{children}</main>
    </div>
  );
}
