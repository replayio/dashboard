import { NavLink } from "@/pageComponents/team/layout/NavLink";
import { Icon } from "@/components/Icon";
import { Workspace } from "@/graphql/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function WorkspaceMenu({ workspace }: { workspace: Workspace }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <Link
        className="px-2 py-1 flex flex-row items-center text-lg text-white hover:text-sky-400"
        href="/team/me/recordings"
      >
        <Icon className="w-4 h-4" type="back-arrow" />
        {workspace.name}
      </Link>

      {workspace.isTest ? (
        <>
          <NavLink
            href={`/team/${workspace.id}/runs`}
            iconType="menu-test-runs"
            isActive={!!pathname?.endsWith("runs")}
            label="Runs"
          />
          <NavLink
            href={`/team/${workspace.id}/tests`}
            iconType="menu-tests"
            isActive={!!pathname?.endsWith("tests")}
            label="Tests"
          />
        </>
      ) : (
        <NavLink
          href={`/team/${workspace.id}/recordings`}
          iconType="menu-recordings"
          isActive={!!pathname?.endsWith("recordings")}
          label="Recordings"
        />
      )}
      <NavLink
        href={`/team/${workspace.id}/settings`}
        iconType="menu-settings"
        isActive={!!pathname?.endsWith("settings")}
        label="Settings"
      />
    </div>
  );
}