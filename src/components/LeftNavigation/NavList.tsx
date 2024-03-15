import { CreateTeamButton } from "@/components/LeftNavigation/CreateTeamButton";
import { CurrentUser } from "@/components/LeftNavigation/CurrentUser";
import { NavLink } from "@/components/LeftNavigation/NavLink";
import { NavLinkTestWorkspace } from "@/components/LeftNavigation/NavLinkTestWorkspace";
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
        <NavLink
          currentUserId={user.id}
          id="me"
          invitationCode=""
          name="Your Library"
        />
        {workspaces.map(({ id, invitationCode, isTest, name }) =>
          isTest ? (
            <NavLinkTestWorkspace
              currentUserId={user.id}
              id={id}
              invitationCode={invitationCode ?? ""}
              key={id}
              name={name}
            />
          ) : (
            <NavLink
              currentUserId={user.id}
              id={id}
              invitationCode={invitationCode ?? ""}
              key={id}
              name={name}
            />
          )
        )}
        <CreateTeamButton isInternalUser={user.isInternal} />
      </div>
      <div className="grow" />
      <CurrentUser user={user} />
    </nav>
  );
}
