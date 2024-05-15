import { LeftNav } from "@/components/LeftNav";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { WorkspaceNavLink } from "@/components/layout/WorkspaceNavLink";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { Workspace } from "@/graphql/types";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function DefaultNav() {
  const { workspaces } = useWorkspaces();

  const pathname = usePathname();
  const workspaceId =
    pathname && pathname.startsWith("/team/") ? pathname.split("/")[2] : undefined;
  let workspace: Workspace | undefined = undefined;
  if (workspaceId) {
    workspace = workspaces?.find(({ id }) => id === workspaceId);
  }

  const sortedWorkspaces = useMemo(() => {
    const merged: Array<Workspace> = [];
    if (workspaces) {
      merged.push(...workspaces);
    }

    return merged.sort((a, b) => {
      if (a.isTest === b.isTest) {
        return a.name.localeCompare(b.name);
      } else {
        return a.isTest ? 1 : -1;
      }
    });
  }, [workspaces]);

  if (!workspaces) {
    return (
      <LeftNav>
        <LoadingProgressBar />
      </LeftNav>
    );
  }

  return (
    <LeftNav showCreateTeamLink>
      {sortedWorkspaces.map(workspace => (
        <WorkspaceNavLink
          id={workspace.id}
          isTest={workspace.isTest}
          key={workspace.id}
          name={workspace.name}
        />
      ))}
    </LeftNav>
  );
}
