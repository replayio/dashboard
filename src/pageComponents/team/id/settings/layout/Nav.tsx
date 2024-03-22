import { NavLink } from "@/pageComponents/team/id/settings/layout/NavLink";

export function Nav({
  currentUserIsAdmin,
  workspaceId,
  workspaceIsOrganization,
}: {
  currentUserIsAdmin: boolean;
  workspaceId: string;
  workspaceIsOrganization: boolean;
}) {
  return (
    <nav className="flex flex-row w-full bg-slate-800 text-white overflow-auto shrink-0 rounded whitespace-nowrap overflow-auto">
      {workspaceIsOrganization && (
        <NavLink
          icon="organization"
          label="Organization"
          route="organization"
          workspaceId={workspaceId}
        />
      )}
      <NavLink
        icon="team-members"
        label="Members"
        route="members"
        workspaceId={workspaceId}
      />
      {currentUserIsAdmin && (
        <NavLink
          icon="billing"
          label="Billing"
          route="billing"
          workspaceId={workspaceId}
        />
      )}
      <NavLink
        icon="api-keys"
        label="API keys"
        route="api-keys"
        workspaceId={workspaceId}
      />
      {currentUserIsAdmin && (
        <NavLink
          icon="delete"
          label="Delete"
          route="delete"
          workspaceId={workspaceId}
        />
      )}
    </nav>
  );
}
