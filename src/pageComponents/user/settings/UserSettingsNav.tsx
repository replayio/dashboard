import { LeftNav } from "@/components/LeftNav";
import { UserSettingsNavLink } from "@/pageComponents/user/settings/UserSettingsNavLink";

export function UserSettingsNav() {
  return (
    <LeftNav
      backLink={{
        href: "/home",
        label: "Settings",
      }}
    >
      <UserSettingsNavLink iconType="account" label="Account" route="account" />
      <UserSettingsNavLink iconType="api-keys" label="API keys" route="api-keys" />
      <UserSettingsNavLink iconType="support" label="Support" route="support" />
      <UserSettingsNavLink iconType="legal" label="Legal" route="legal" />
    </LeftNav>
  );
}
