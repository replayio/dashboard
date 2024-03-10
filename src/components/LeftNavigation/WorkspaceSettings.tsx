"use client";

import { SettingsDialog } from "@/components/SettingsDialog";

export function WorkspaceSettings({
  id,
  name,
  onDismiss,
}: {
  id: string;
  name: string;
  onDismiss: () => void;
}) {
  return (
    <SettingsDialog
      defaultPanel="team-members"
      onDismiss={onDismiss}
      panels={{
        "team-members": {
          children: <ComingSoon />,
          icon: "team-members",
          label: "Team members",
        },
        billing: {
          children: <ComingSoon />,
          icon: "billing",
          label: "Billing",
        },
        "api-keys": {
          children: <ComingSoon />,
          icon: "api-keys",
          label: "API keys",
        },
        delete: {
          children: <ComingSoon />,
          icon: "delete",
          label: "Delete team",
        },
      }}
      title={`${name} settings`}
    />
  );
}

function ComingSoon() {
  return <div>Not yet implemented...</div>;
}
