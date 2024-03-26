import { Icon } from "@/components/Icon";
import { ReplayLogo } from "@/components/ReplayLogo";
import { Workspace } from "@/graphql/types";
import { NavLink } from "@/pageComponents/team/id/settings/layout/NavLink";
import { CurrentUser } from "@/pageComponents/team/layout/CurrentUser";
import Link from "next/link";

export function Nav({
  currentUserIsAdmin,
  workspace,
}: {
  currentUserIsAdmin: boolean;
  workspace: Workspace;
}) {
  return (
    <nav className="flex flex-col gap-2 h-full text-white overflow-auto shrink-0 w-72 p-2 pr-0">
      <div className="flex flex-row items-center gap-2 p-2 bg-slate-950 rounded">
        <ReplayLogo className="max-h-6 max-w-6" />
        <div className="text-xl font-bold">Replay</div>
      </div>
      <div className="flex flex-col overflow-auto bg-slate-800 rounded grow">
        <Link
          className="px-2 py-1 flex flex-row items-center text-lg text-white hover:text-sky-400 overflow-auto"
          data-test-id="NavLink-back-to-my-library"
          href={
            workspace.isTest
              ? `/team/${workspace.id}/runs`
              : `/team/${workspace.id}/recordings`
          }
        >
          <Icon className="w-4 h-4 shrink-0" type="back-arrow" />
          <div className="flex flex-row items-center truncate">
            <div
              className="truncate"
              data-test-id="Nav-team-name"
              title={workspace.name}
            >
              {workspace.name}
            </div>
            <div>: Settings</div>
          </div>
        </Link>
        {workspace.isOrganization && (
          <NavLink
            icon="organization"
            label="Organization"
            route="organization"
            workspaceId={workspace.id}
          />
        )}
        <NavLink
          icon="team-members"
          label="Members"
          route="members"
          workspaceId={workspace.id}
        />
        {currentUserIsAdmin && (
          <NavLink
            icon="billing"
            label="Billing"
            route="billing"
            workspaceId={workspace.id}
          />
        )}
        <NavLink
          icon="api-keys"
          label="API keys"
          route="api-keys"
          workspaceId={workspace.id}
        />
        {currentUserIsAdmin && (
          <NavLink
            icon="delete"
            label="Delete"
            route="delete"
            workspaceId={workspace.id}
          />
        )}
      </div>
      <CurrentUser />
    </nav>
  );
}
