import { LeftNavLink } from "@/components/LeftNavLink";

import { usePathname } from "next/navigation";

export function NewTeamLink() {
  const pathname = usePathname();
  const isActive = pathname === "/team/new/standard";

  return (
    <LeftNavLink
      href="/team/new/standard"
      iconType="create"
      isActive={isActive}
      label="Create new team"
    />
  );
}
