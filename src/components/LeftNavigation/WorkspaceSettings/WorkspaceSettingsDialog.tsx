"use client";

import { DeleteWorkspace } from "@/components/LeftNavigation/WorkspaceSettings/DeleteWorkspace";
import { TeamMembers } from "@/components/LeftNavigation/WorkspaceSettings/TeamMembers";
import { SettingsDialog } from "@/components/SettingsDialog";

export function WorkspaceSettingsDialog({
  id,
  invitationCode,
  name,
  onDismiss,
}: {
  id: string;
  invitationCode: string;
  name: string;
  onDismiss: () => void;
}) {
  return (
    <SettingsDialog
      defaultPanel="team-members"
      onDismiss={onDismiss}
      panels={{
        "team-members": {
          children: <TeamMembers id={id} invitationCode={invitationCode} />,
          icon: "team-members",
          label: "Members",
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
          children: <DeleteWorkspace id={id} />,
          icon: "delete-team",
          label: "Delete",
        },
      }}
      title={`${name} settings`}
    />
  );
}

function ComingSoon() {
  return <div>Not yet implemented...</div>;
}
