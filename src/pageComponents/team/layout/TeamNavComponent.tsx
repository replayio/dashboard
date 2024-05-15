import { LeftNav } from "@/components/LeftNav";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { Workspace } from "@/graphql/types";
import { TeamDefaultNav } from "@/pageComponents/team/layout/TeamDefaultNav";
import { TeamWorkspaceNav } from "@/pageComponents/team/layout/TeamWorkspaceNav";
import { usePathname } from "next/navigation";

export function TeamNavComponent() {
  const { workspaces } = useWorkspaces();

  const pathname = usePathname();
  const workspaceId =
    pathname && pathname.startsWith("/team/") ? pathname.split("/")[2] : undefined;
  let workspace: Workspace | undefined = undefined;
  if (workspaceId) {
    workspace = workspaces?.find(({ id }) => id === workspaceId);
  }

  if (workspace) {
    return <TeamWorkspaceNav workspace={workspace} />;
  } else if (workspaces) {
    return <TeamDefaultNav workspaces={workspaces} />;
  } else {
    return (
      <LeftNav>
        <LoadingProgressBar />
      </LeftNav>
    );
  }
}
