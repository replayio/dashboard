import { LeftNav } from "@/components/LeftNav";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { SessionContext } from "@/components/SessionContext";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { SettingsNav } from "@/pageComponents/team/id/settings/layout/SettingsNav";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export function SettingsNavComponent() {
  const pathname = usePathname();
  const workspaceId = pathname?.split("/")[2] as string;

  const { workspaces } = useWorkspaces();
  const { user } = useContext(SessionContext);
  const { members } = useGetWorkspaceMembers(workspaceId);

  const member = members?.find(({ id }) => id === user?.id);
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  if (workspace && user) {
    return (
      <SettingsNav
        currentUserIsAdmin={member?.roles.includes("admin") == true}
        workspace={workspace}
      />
    );
  } else {
    return (
      <LeftNav>
        <LoadingProgressBar />
      </LeftNav>
    );
  }
}
