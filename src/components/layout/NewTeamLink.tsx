import { LeftNavLink } from "@/components/LeftNavLink";

import { usePathname } from "next/navigation";

export function NewTeamLink() {
  const pathname = usePathname();
  const isActive = pathname === "/team/me/recordings";

  return (
    <LeftNavLink
      href="/team/me/recordings"
      iconType="create"
      isActive={isActive}
      label="Create new team"
    />
  );
}
