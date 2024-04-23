import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { SettingsNavComponent } from "@/pageComponents/user/settings/SettingsNavComponent";
import { PropsWithChildren } from "react";

export function SettingsLayout({ children }: PropsWithChildren) {
  return <TeamLayout NavComponent={SettingsNavComponent}>{children}</TeamLayout>;
}
