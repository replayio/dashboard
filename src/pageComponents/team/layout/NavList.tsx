import { CreateTeamButton } from "@/pageComponents/team/layout/CreateTeamButton";
import { CurrentUser } from "@/pageComponents/team/layout/CurrentUser";
import { WorkspaceLinkList } from "@/pageComponents/team/layout/WorkspaceLinkList";
import { WorkspaceMenu } from "@/pageComponents/team/layout/WorkspaceMenu";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { Workspace } from "@/graphql/types";
import { usePathname } from "next/navigation";

export function NavList() {
  const { workspaces } = useNonPendingWorkspaces();
  const { user } = useCurrentUser();

  const pathname = usePathname();
  const workspaceId =
    pathname && pathname.startsWith("/team/")
      ? pathname.split("/")[2]
      : undefined;
  let workspace: Workspace | undefined = undefined;
  if (workspaceId) {
    workspace = workspaces?.find(({ id }) => id === workspaceId);
  }

  return (
    <nav className="flex flex-col gap-2 h-full text-white overflow-auto shrink-0 w-72 p-2 pr-0">
      <div className="flex flex-row items-center gap-2 p-2 bg-slate-950 rounded">
        <ReplayLogo className="max-h-6 max-w-6" />
        <div className="text-xl font-bold">Replay</div>
      </div>
      <div className="flex flex-col overflow-auto bg-slate-800 rounded grow">
        {workspace ? (
          <WorkspaceMenu workspace={workspace} />
        ) : workspaces ? (
          <WorkspaceLinkList workspaces={workspaces} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
      {workspace ? null : (
        <CreateTeamButton isInternalUser={user?.isInternal == true} />
      )}
      <CurrentUser />
    </nav>
  );
}
