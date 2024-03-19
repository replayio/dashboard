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
    <nav className="flex flex-col h-full bg-slate-800 text-white overflow-auto shrink-0">
      <div className="p-4">
        <ReplayLogo />
      </div>
      <div className="flex flex-col overflow-auto">
        <NavLink
          currentUserId={user?.id ?? null}
          id="me"
          invitationCode=""
          name="Your Library"
        />
        {workspaces?.map(({ id, invitationCode, isTest, name }) =>
          isTest ? (
            <NavLinkTestWorkspace
              currentUserId={user?.id ?? null}
              id={id}
              invitationCode={invitationCode ?? ""}
              key={id}
              name={name}
            />
          ) : (
            <NavLink
              currentUserId={user?.id ?? null}
              id={id}
              invitationCode={invitationCode ?? ""}
              key={id}
              name={name}
            />
          )
        )}
        <CreateTeamButton isInternalUser={user?.isInternal == true} />
      </div>
      <div className="grow" />
      <CurrentUser />
    </nav>
  );
}
