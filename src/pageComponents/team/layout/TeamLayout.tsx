import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { TeamNav } from "@/pageComponents/team/layout/TeamNav";
import { PropsWithChildren } from "react";

export function TeamLayout({ children }: PropsWithChildren) {
  return <DefaultLayout NavComponent={TeamNav}>{children}</DefaultLayout>;
}
