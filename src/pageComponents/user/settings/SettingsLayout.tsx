import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { UserSettingsNav } from "@/pageComponents/user/settings/UserSettingsNav";
import { PropsWithChildren } from "react";

export function SettingsLayout({ children }: PropsWithChildren) {
  return <DefaultLayout NavComponent={UserSettingsNav}>{children}</DefaultLayout>;
}
