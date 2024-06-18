import { LeftNav } from "@/components/LeftNav";
import { LeftNavLink } from "@/components/LeftNavLink";
import { DefaultNav } from "@/components/layout/DefaultNav";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { Workspace } from "@/graphql/types";
import { usePathname } from "next/navigation";

export function TeamNav() {
  const { workspaces } = useWorkspaces();

  let workspace: Workspace | undefined = undefined;

  const pathname = usePathname();
  if (pathname && pathname.startsWith("/team/")) {
    const workspaceId = pathname.split("/")[2];
    if (workspaceId) {
      workspace = workspaces?.find(({ id }) => id === workspaceId);
    }
  }

  if (!workspace) {
    return <DefaultNav />;
  }

  return (
    <LeftNav
      backLink={{
        href: "/home",
        label: workspace.name,
      }}
    >
      {workspace.isTest ? (
        <>
          <LeftNavLink
            href={`/team/${workspace.id}/runs`}
            iconType="menu-test-runs"
            isActive={!!pathname?.endsWith("runs")}
            label="Runs"
          />
          {/* TODO [PRO-664] Re-enable Tests view once GraphQL perf issue has been resolved */}
          <LeftNavLink
            disabled
            href={`/team/${workspace.id}/tests`}
            iconType="menu-tests"
            isActive={!!pathname?.endsWith("tests")}
            label="Tests"
            title="Tests view is temporarily disabled while we fix an performance issue."
          />
        </>
      ) : (
        <LeftNavLink
          href={`/team/${workspace.id}/recordings`}
          iconType="menu-recordings"
          isActive={!!pathname?.endsWith("recordings")}
          label="Recordings"
        />
      )}
      <LeftNavLink
        href={`/team/${workspace.id}/settings`}
        iconType="menu-settings"
        isActive={!!pathname?.includes("/settings")}
        label="Settings"
      />
    </LeftNav>
  );
}
