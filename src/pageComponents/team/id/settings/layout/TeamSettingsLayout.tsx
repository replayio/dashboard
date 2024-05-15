import { TeamSettingsNav } from "@/pageComponents/team/id/settings/layout/TeamSettingsNav";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { PropsWithChildren } from "react";

export function TeamSettingsLayout({ children }: PropsWithChildren) {
  return <DefaultLayout NavComponent={TeamSettingsNav}>{children}</DefaultLayout>;
}
