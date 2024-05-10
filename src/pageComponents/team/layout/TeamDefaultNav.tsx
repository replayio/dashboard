import { LeftNav } from "@/components/LeftNav";
import { PendingWorkspace, Workspace } from "@/graphql/types";
import { TeamDefaultNavLink } from "@/pageComponents/team/layout/TeamDefaultNavLink";
import { isPendingWorkspace } from "@/utils/workspace";
import { useMemo } from "react";

export function TeamDefaultNav({
  pendingWorkspaces,
  workspaces,
}: {
  pendingWorkspaces: PendingWorkspace[];
  workspaces: Workspace[];
}) {
  const mergedWorkspaces = useMemo(() => {
    return [...pendingWorkspaces, ...workspaces].sort((a, b) => {
      if (a.isTest === b.isTest) {
        return a.name.localeCompare(b.name);
      } else {
        return a.isTest ? 1 : -1;
      }
    });
  }, [pendingWorkspaces, workspaces]);

  return (
    <LeftNav>
      <TeamDefaultNavLink id="me" isPending={false} isTest={false} name="My Library" />
      {mergedWorkspaces.map(workspace => (
        <TeamDefaultNavLink
          id={workspace.id}
          isPending={isPendingWorkspace(workspace)}
          isTest={workspace.isTest}
          key={workspace.id}
          name={workspace.name}
        />
      ))}
    </LeftNav>
  );
}
