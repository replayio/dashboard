import { Account } from "@/components/LeftNavigation/UserSettings/Account";
import { Legal } from "@/components/LeftNavigation/UserSettings/Legal";
import { Support } from "@/components/LeftNavigation/UserSettings/Support";
import { UserApiKeys } from "@/components/LeftNavigation/UserSettings/UserApiKeys";
import { SettingsDialog } from "@/components/SettingsDialog";
import { User } from "@/graphql/types";

export function UserSettingsDialog({
  onDismiss,
  user,
}: {
  onDismiss: () => void;
  user: User;
}) {
  return (
    <SettingsDialog
      defaultPanel="account"
      onDismiss={onDismiss}
      panels={{
        account: {
          children: <Account user={user} />,
          icon: "account",
          label: "Account",
        },
        apiKeys: {
          children: <UserApiKeys />,
          icon: "api-keys",
          label: "API keys",
        },
        support: {
          children: <Support />,
          icon: "support",
          label: "Support",
        },
        legal: {
          children: <Legal />,
          icon: "legal",
          label: "Legal",
        },
      }}
      title="Settings"
    />
  );
}
