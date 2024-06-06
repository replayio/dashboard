import { LeftNavLink } from "@/components/LeftNavLink";

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
