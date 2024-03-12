import { CreateTeamButton } from "@/components/LeftNavigation/CreateTeamButton";
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
        <NavLink id="me" isTest={false} invitationCode="" name="Your Library" />
        {workspaces.map(({ id, invitationCode, isTest, name }) => (
          <NavLink
            id={id}
            isTest={isTest}
            invitationCode={invitationCode ?? ""}
            key={id}
            name={name}
          />
        ))}
        <CreateTeamButton />
      </div>
      <div className="grow" />
      <CurrentUser user={user} />
    </nav>
  );
}
