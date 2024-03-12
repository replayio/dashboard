"use client";

import { Billing } from "@/components/LeftNavigation/WorkspaceSettings/Billing";
import { DeleteWorkspace } from "@/components/LeftNavigation/WorkspaceSettings/DeleteWorkspace";
import { TeamMembers } from "@/components/LeftNavigation/WorkspaceSettings/TeamMembers";
import { WorkspaceApiKeys } from "@/components/LeftNavigation/WorkspaceSettings/WorkspaceApiKeys";
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
          children: <Billing workspaceId={id} />,
          icon: "billing",
          label: "Billing",
        },
        "api-keys": {
          children: <WorkspaceApiKeys workspaceId={id} />,
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
