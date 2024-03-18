import { Billing } from "@/components/LeftNavigation/WorkspaceSettings/Billing";
import { DeleteWorkspace } from "@/components/LeftNavigation/WorkspaceSettings/DeleteWorkspace";
import { TeamMembers } from "@/components/LeftNavigation/WorkspaceSettings/TeamMembers";
import { WorkspaceApiKeys } from "@/components/LeftNavigation/WorkspaceSettings/WorkspaceApiKeys";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";

export function WorkspaceSettingsDialog({
  currentUserId,
  id,
  invitationCode,
  name,
  onDismiss,
}: {
  currentUserId: string | null;
  id: string;
  invitationCode: string;
  name: string;
  onDismiss: () => void;
}) {
  const { members } = useGetWorkspaceMembers(id);
  const currentMember = members?.find((member) => member.id === currentUserId);
  const isAdmin = currentMember?.roles.includes("admin");

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
        billing: isAdmin
          ? {
              children: <Billing workspaceId={id} />,
              icon: "billing",
              label: "Billing",
            }
          : null,
        "api-keys": {
          children: <WorkspaceApiKeys workspaceId={id} />,
          icon: "api-keys",
          label: "API keys",
        },
        delete: isAdmin
          ? {
              children: <DeleteWorkspace id={id} />,
              icon: "delete-team",
              label: "Delete",
            }
          : null,
      }}
      title={`${name} settings`}
    />
  );
}
