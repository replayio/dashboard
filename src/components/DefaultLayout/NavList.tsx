import { CreateTeamButton } from "@/components/DefaultLayout/CreateTeamButton";
import { CurrentUser } from "@/components/DefaultLayout/CurrentUser";
import { NavLink } from "@/components/DefaultLayout/NavLink";
import { NavLinkTestWorkspace } from "@/components/DefaultLayout/NavLinkTestWorkspace";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";

export function NavList() {
  const { workspaces } = useNonPendingWorkspaces();
  const { user } = useCurrentUser();

  return (
    <nav className="flex flex-col h-full bg-slate-800 text-white overflow-auto shrink-0 w-72">
      <div className="p-1">
        <div className="flex flex-row items-center gap-2 p-2 bg-slate-950 rounded">
          <ReplayLogo className="max-h-6 max-w-6" />
          <div className="text-xl font-bold">Replay</div>
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <NavLink id="me" name="Your Library" />
        {workspaces?.map(({ id, isTest, name }) =>
          isTest ? (
            <NavLinkTestWorkspace id={id} key={id} name={name} />
          ) : (
            <NavLink id={id} key={id} name={name} />
          )
        )}
        <CreateTeamButton isInternalUser={user?.isInternal == true} />
      </div>
      <div className="grow" />
      <div className="p-1">
        <CurrentUser />
      </div>
    </nav>
  );
}
