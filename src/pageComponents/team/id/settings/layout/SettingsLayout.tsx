import { NavList } from "@/pageComponents/team/id/settings/layout/NavList";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { PropsWithChildren } from "react";

export function SettingsLayout({ children }: PropsWithChildren) {
  return <TeamLayout NavComponent={NavList}>{children}</TeamLayout>;
}
