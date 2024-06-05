import { LeftNavLink } from "@/components/LeftNavLink";

import { usePathname } from "next/navigation";

export function CreateTestSuiteLink() {
  const pathname = usePathname();
  const isActive = pathname === "/team/new/tests";

  return (
    <LeftNavLink
      href="/team/new/tests"
      iconType="create"
      isActive={isActive}
      label="Create test suite"
    />
  );
}
