import { LeftNavLink } from "@/components/LeftNavLink";

import { usePathname } from "next/navigation";

export function CreateTestSuiteLink() {
  return (
    <LeftNavLink
      href="/team/new/tests"
      iconType="create"
      isActive={false}
      label="Create test suite"
    />
  );
}
