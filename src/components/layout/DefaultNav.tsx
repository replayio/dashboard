import { LeftNavLink } from "@/components/LeftNavLink";
import { LeftNav } from "@/components/LeftNav";
import { WorkspaceNavLoading } from "@/components/WorkspaceNavLoading";
import { useSidebar } from "@/components/SidebarContext";
import { GitHubWorkspaceNavLink } from "@/components/layout/GitHubWorkspaceNavLink";
import { WorkspaceNavLink } from "@/components/layout/WorkspaceNavLink";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { Workspace } from "@/graphql/types";
import { useGithubRepositoryOwners } from "@/hooks/useGithubRepositoryOwners";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function DefaultNav() {
  const { workspaces } = useWorkspaces();
  const {
    connectUrl,
    isLoading: isLoadingGithubOwners,
    owners: githubOwners,
  } = useGithubRepositoryOwners();

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
        <WorkspaceNavLoading />
        <GitHubWorkspaceSection
          connectUrl={connectUrl}
          isLoading={isLoadingGithubOwners}
          owners={githubOwners}
        />
      </LeftNav>
    );
  }

  return (
    <LeftNav>
      {sortedWorkspaces.map(workspace => (
        <WorkspaceNavLink
          id={workspace.id}
          isTest={workspace.isTest}
          key={workspace.id}
          name={workspace.name}
        />
      ))}
      <GitHubWorkspaceSection
        connectUrl={connectUrl}
        isLoading={isLoadingGithubOwners}
        owners={githubOwners}
      />
    </LeftNav>
  );
}

function GitHubWorkspaceSection({
  connectUrl,
  isLoading,
  owners,
}: {
  connectUrl?: string;
  isLoading: boolean;
  owners?: NonNullable<ReturnType<typeof useGithubRepositoryOwners>["owners"]>;
}) {
  if (isLoading) {
    return (
      <>
        <NavSectionLabel>GitHub</NavSectionLabel>
        <WorkspaceNavLoading rowCount={1} />
      </>
    );
  }

  if (owners?.length) {
    return (
      <>
        <NavSectionLabel>GitHub</NavSectionLabel>
        {owners.map(owner => (
          <GitHubWorkspaceNavLink key={owner.login} owner={owner} />
        ))}
      </>
    );
  }

  if (connectUrl) {
    return (
      <>
        <NavSectionLabel>GitHub</NavSectionLabel>
        <LeftNavLink
          href={connectUrl}
          iconType="organization"
          isActive={false}
          label="Connect GitHub"
        />
      </>
    );
  }

  return null;
}

function NavSectionLabel({ children }: { children: string }) {
  const { isCollapsed } = useSidebar();
  if (isCollapsed) {
    return <hr className="my-2 border-border" />;
  }

  return (
    <div className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </div>
  );
}
