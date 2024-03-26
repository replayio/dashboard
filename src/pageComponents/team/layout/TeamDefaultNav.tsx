import { LeftNav } from "@/components/LeftNav";
import { PendingWorkspace, Workspace } from "@/graphql/types";
import { TeamDefaultNavLink } from "@/pageComponents/team/layout/TeamDefaultNavLink";

export function TeamDefaultNav({
  pendingWorkspaces,
  workspaces,
}: {
  pendingWorkspaces: PendingWorkspace[];
  workspaces: Workspace[];
}) {
  return (
    <LeftNav>
      <TeamDefaultNavLink
        id="me"
        isPending={false}
        isTest={false}
        name="My Library"
      />
      {pendingWorkspaces?.map(({ id, isTest, name }) => (
        <TeamDefaultNavLink
          id={id}
          isPending={true}
          isTest={isTest}
          key={id}
          name={name}
        />
      ))}
      {workspaces?.map(({ id, isTest, name }) => (
        <TeamDefaultNavLink
          id={id}
          isPending={false}
          isTest={isTest}
          key={id}
          name={name}
        />
      ))}
    </LeftNav>
  );
}
