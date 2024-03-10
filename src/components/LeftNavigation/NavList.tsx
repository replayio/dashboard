import { CurrentUser } from "@/components/LeftNavigation/CurrentUser";
import { NavLink } from "@/components/LeftNavigation/NavLink";
import { ReplayLogo } from "@/components/ReplayLogo";
import { getCurrentUserServer } from "@/graphql/queries/getCurrentUser";
import { getNonPendingWorkspacesServer } from "@/graphql/queries/getNonPendingWorkspaces";

export async function NavList() {
  const workspaces = await getNonPendingWorkspacesServer();
  const user = await getCurrentUserServer();

  return (
    <nav className="flex flex-col h-full bg-slate-800 text-white overflow-auto shrink-0">
      <div className="p-4">
        <ReplayLogo />
      </div>
      <div className="flex flex-col overflow-auto">
        <NavLink id="me" isTest={false} name="Your Library" />
        {workspaces.map(({ id, isTest, name }) => (
          <NavLink id={id} isTest={isTest} key={id} name={name} />
        ))}
        <button className="pl-10 text-white px-4 py-1 underline w-full text-left">
          Create new team
        </button>
      </div>
      <div className="grow" />
      <CurrentUser user={user} />
    </nav>
  );
}
