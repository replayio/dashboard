import { LeftNav } from "@/components/LeftNav";
import { Workspace } from "@/graphql/types";
import { SettingsNavLink } from "@/pageComponents/team/id/settings/layout/SettingsNavLink";

export function SettingsNav({
  currentUserIsAdmin,
  workspace,
}: {
  currentUserIsAdmin: boolean;
  workspace: Workspace;
}) {
  return (
    <LeftNav
      backLink={{
        href: workspace.isTest ? `/team/${workspace.id}/runs` : `/team/${workspace.id}/recordings`,
        label: `${workspace.name}: Settings`,
      }}
    >
      {workspace.isOrganization && (
        <SettingsNavLink
          iconType="organization"
          label="Organization"
          route="organization"
          workspaceId={workspace.id}
        />
      )}
      <SettingsNavLink
        iconType="team-members"
        label="Members"
        route="members"
        workspaceId={workspace.id}
      />
      {currentUserIsAdmin && (
        <SettingsNavLink
          workspaceId={workspace.id}
          label="Billing"
          route="billing"
          iconType="billing"
        />
      )}
      <SettingsNavLink
        workspaceId={workspace.id}
        label="API keys"
        route="api-keys"
        iconType="api-keys"
      />
      {currentUserIsAdmin && (
        <SettingsNavLink
          workspaceId={workspace.id}
          label="Delete"
          route="delete"
          iconType="delete"
        />
      )}
    </LeftNav>
  );
}
