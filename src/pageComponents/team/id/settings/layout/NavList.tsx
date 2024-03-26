import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { Nav } from "@/pageComponents/team/id/settings/layout/Nav";
import { usePathname } from "next/navigation";

export function NavList() {
  const pathname = usePathname();
  const workspaceId = pathname?.split("/")[2] as string;

  const { user } = useCurrentUser();
  const { members } = useGetWorkspaceMembers(workspaceId);
  const member = members?.find(({ id }) => id === user?.id);

  const { workspaces } = useNonPendingWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  if (user == null || members == null || workspace == null) {
    return <LoadingSpinner />;
  }

  return (
    <Nav
      currentUserIsAdmin={member?.roles.includes("admin") == true}
      workspace={workspace}
    />
  );
}
