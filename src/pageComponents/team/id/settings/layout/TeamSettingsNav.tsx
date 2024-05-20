import { LeftNav } from "@/components/LeftNav";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { SessionContext } from "@/components/SessionContext";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { TeamSettingsNavLink } from "@/pageComponents/team/id/settings/layout/TeamSettingsNavLink";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export function TeamSettingsNav() {
  const pathname = usePathname();
  const workspaceId = pathname?.split("/")[2] as string;

  const { workspaces } = useWorkspaces();
  const { user } = useContext(SessionContext);
  const { members } = useGetWorkspaceMembers(workspaceId);

  const member = members?.find(({ id }) => id === user?.id);
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  if (!workspace || !user) {
    return (
      <LeftNav>
        <LoadingProgressBar />
      </LeftNav>
    );
  }

  const currentUserIsAdmin = member?.roles.includes("admin") == true;

  return (
    <LeftNav
      backLink={{
        href: workspace.isTest ? `/team/${workspace.id}/runs` : `/team/${workspace.id}/recordings`,
        label: `${workspace.name}: Settings`,
      }}
    >
      {workspace.isOrganization && (
        <TeamSettingsNavLink
          iconType="organization"
          label="Organization"
          route="organization"
          workspaceId={workspace.id}
        />
      )}
      <TeamSettingsNavLink
        iconType="team-members"
        label="Members"
        route="members"
        workspaceId={workspace.id}
      />
      {currentUserIsAdmin && (
        <TeamSettingsNavLink
          workspaceId={workspace.id}
          label="Billing"
          route="billing"
          iconType="billing"
        />
      )}
      <TeamSettingsNavLink
        workspaceId={workspace.id}
        label="API keys"
        route="api-keys"
        iconType="api-keys"
      />
      {currentUserIsAdmin && (
        <TeamSettingsNavLink
          workspaceId={workspace.id}
          label="Delete"
          route="delete"
          iconType="delete"
        />
      )}
    </LeftNav>
  );
}
