import { SettingsNavComponent } from "@/pageComponents/team/id/settings/layout/SettingsNavComponent";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { PropsWithChildren } from "react";

export function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <TeamLayout NavComponent={SettingsNavComponent}>{children}</TeamLayout>
  );
}
