import { LeftNav } from "@/components/LeftNav";
import { SettingsNavLink } from "@/pageComponents/user/settings/SettingsNavLink";

export function SettingsNavComponent() {
  return (
    <LeftNav
      backLink={{
        href: "/team/me/recordings",
        label: "Settings",
      }}
    >
      <SettingsNavLink iconType="account" label="Account" route="account" />
      <SettingsNavLink iconType="api-keys" label="API keys" route="api-keys" />
      <SettingsNavLink iconType="support" label="Support" route="support" />
      <SettingsNavLink iconType="legal" label="Legal" route="legal" />
    </LeftNav>
  );
}
