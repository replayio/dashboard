import { LeftNav } from "@/components/LeftNav";
import { Workspace } from "@/graphql/types";
import { TeamDefaultNavLink } from "@/pageComponents/team/layout/TeamDefaultNavLink";
import { useMemo } from "react";

export function TeamDefaultNav({ workspaces }: { workspaces: Workspace[] }) {
  const sortedWorkspaces = useMemo(() => {
    return [...workspaces].sort((a, b) => {
      if (a.isTest === b.isTest) {
        return a.name.localeCompare(b.name);
      } else {
        return a.isTest ? 1 : -1;
      }
    });
  }, [workspaces]);

  return (
    <LeftNav>
      <TeamDefaultNavLink id="me" isTest={false} name="My Library" />
      {sortedWorkspaces.map(workspace => (
        <TeamDefaultNavLink
          id={workspace.id}
          isTest={workspace.isTest}
          key={workspace.id}
          name={workspace.name}
        />
      ))}
    </LeftNav>
  );
}
