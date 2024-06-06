import { LeftNavLink } from "@/components/LeftNavLink";

import { usePathname } from "next/navigation";

export function NewTeamLink() {
  return (
    <LeftNavLink
      href="/team/new/standard"
      iconType="create"
      isActive={false}
      label="Create new team"
    />
  );
}
