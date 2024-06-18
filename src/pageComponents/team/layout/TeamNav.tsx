import { Icon } from "@/components/Icon";
import { LeftNav } from "@/components/LeftNav";
import { LeftNavLink } from "@/components/LeftNavLink";
import { DefaultNav } from "@/components/layout/DefaultNav";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { Workspace } from "@/graphql/types";
import useTooltip from "@/hooks/useTooltip";
import { usePathname } from "next/navigation";

export function TeamNav() {
  const { workspaces } = useWorkspaces();

  let workspace: Workspace | undefined = undefined;

  const { onMouseEnter, onMouseMove, onMouseLeave, tooltip } = useTooltip({
    tooltip: "Tests view is temporarily disabled while we fix an performance issue.",
  });

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
          {/* <LeftNavLink
            href={`/team/${workspace.id}/tests`}
            iconType="menu-tests"
            isActive={!!pathname?.endsWith("tests")}
            label="Tests"
          /> */}
          <div
            className={`flex flex-row gap-2 items-center text-white px-2 py-1 transition rounded text-gray-400`}
            data-test-name="LeftNavLink"
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <Icon className="h-4 w-4 hidden md:block shrink-0" type="menu-tests" />
            <div className="grow truncate">Tests</div>
          </div>
          {tooltip}
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
