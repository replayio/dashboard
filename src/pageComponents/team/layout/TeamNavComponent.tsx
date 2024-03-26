import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { usePendingWorkspaces } from "@/graphql/queries/usePendingWorkspaces";
import { Workspace } from "@/graphql/types";
import { TeamDefaultNav } from "@/pageComponents/team/layout/TeamDefaultNav";
import { TeamWorkspaceNav } from "@/pageComponents/team/layout/TeamWorkspaceNav";
import { usePathname } from "next/navigation";

export function TeamNavComponent() {
  const { workspaces } = useNonPendingWorkspaces();
  const { workspaces: pendingWorkspaces } = usePendingWorkspaces();

  const pathname = usePathname();
  const workspaceId =
    pathname && pathname.startsWith("/team/")
      ? pathname.split("/")[2]
      : undefined;
  let workspace: Workspace | undefined = undefined;
  if (workspaceId) {
    workspace = workspaces?.find(({ id }) => id === workspaceId);
  }

  if (workspace) {
    return <TeamWorkspaceNav workspace={workspace} />;
  } else if (pendingWorkspaces && workspaces) {
    return (
      <TeamDefaultNav
        pendingWorkspaces={pendingWorkspaces}
        workspaces={workspaces}
      />
    );
  } else {
    return <LoadingSpinner />;
  }
}
