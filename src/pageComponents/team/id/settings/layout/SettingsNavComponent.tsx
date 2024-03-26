import { LeftNav } from "@/components/LeftNav";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { SettingsNav } from "@/pageComponents/team/id/settings/layout/SettingsNav";
import { usePathname } from "next/navigation";

export function SettingsNavComponent() {
  const pathname = usePathname();
  const workspaceId = pathname?.split("/")[2] as string;

  const { workspaces } = useNonPendingWorkspaces();
  const { user } = useCurrentUser();
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
