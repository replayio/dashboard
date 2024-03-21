import { Billing } from "@/components/DefaultLayout/WorkspaceSettings/Billing";
import { DeleteWorkspace } from "@/components/DefaultLayout/WorkspaceSettings/DeleteWorkspace";
import { Organization } from "@/components/DefaultLayout/WorkspaceSettings/Organization";
import { TeamMembers } from "@/components/DefaultLayout/WorkspaceSettings/TeamMembers";
import { WorkspaceApiKeys } from "@/components/DefaultLayout/WorkspaceSettings/WorkspaceApiKeys";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import assert from "assert";

export function WorkspaceSettingsDialog({
  currentUserId,
  id: workspaceId,
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
  const { workspaces } = useNonPendingWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);
  assert(workspace != null, `Workspace not found "${workspaceId}"`);

  const { members } = useGetWorkspaceMembers(workspaceId);
  const currentMember = members?.find((member) => member.id === currentUserId);
  const isAdmin = currentMember?.roles.includes("admin");

  return (
    <SettingsDialog
      defaultPanel={workspace.isOrganization ? "organization" : "team-members"}
      onDismiss={onDismiss}
      panels={{
        organization: workspace.isOrganization
          ? {
              children: <Organization id={workspaceId} />,
              icon: "organization",
              label: "Organization",
            }
          : null,
        "team-members": {
          children: (
            <TeamMembers id={workspaceId} invitationCode={invitationCode} />
          ),
          icon: "team-members",
          label: "Members",
        },
        billing: isAdmin
          ? {
              children: <Billing workspaceId={workspaceId} />,
              icon: "billing",
              label: "Billing",
            }
          : null,
        "api-keys": {
          children: <WorkspaceApiKeys workspaceId={workspaceId} />,
          icon: "api-keys",
          label: "API keys",
        },
        delete: isAdmin
          ? {
              children: <DeleteWorkspace id={workspaceId} />,
              icon: "delete-team",
              label: "Delete",
            }
          : null,
      }}
      title={`${name} settings`}
    />
  );
}
