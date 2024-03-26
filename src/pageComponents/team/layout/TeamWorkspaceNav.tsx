import { LeftNav } from "@/components/LeftNav";
import { LeftNavLink } from "@/components/LeftNavLink";
import { Workspace } from "@/graphql/types";
import { usePathname } from "next/navigation";

export function TeamWorkspaceNav({ workspace }: { workspace: Workspace }) {
  const pathname = usePathname();

  return (
    <LeftNav
      backLink={{
        href: "/team/me/recordings",
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
          <LeftNavLink
            href={`/team/${workspace.id}/tests`}
            iconType="menu-tests"
            isActive={!!pathname?.endsWith("tests")}
            label="Tests"
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
        href={`/team/${workspace.id}/settings/members`}
        iconType="menu-settings"
        isActive={!!pathname?.includes("/settings")}
        label="Settings"
      />
    </LeftNav>
  );
}
