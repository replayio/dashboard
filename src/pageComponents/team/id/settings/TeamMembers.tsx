import { SessionContext } from "@/components/SessionContext";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { useGetWorkspaceMembershipRequests } from "@/graphql/queries/useGetWorkspaceMembershipRequests";
import { InvitationLink } from "@/pageComponents/team/id/settings/InvitationLink";
import { InviteTeamMember } from "@/pageComponents/team/id/settings/InviteTeamMember";
import { PendingWorkspaceMemberRow } from "@/pageComponents/team/id/settings/PendingWorkspaceMemberRow";
import { TeamMemberRow } from "@/pageComponents/team/id/settings/TeamMemberRow";
import { useContext, useMemo } from "react";

export function TeamMembers({
  invitationCode,
  workspaceId,
}: {
  invitationCode: string | null;
  workspaceId: string;
}) {
  const { user } = useContext(SessionContext);

  const { error, isLoading, members } = useGetWorkspaceMembers(workspaceId);

  const { pendingWorkspaceMembers } = useGetWorkspaceMembershipRequests(workspaceId);

  const member = members?.find(({ id }) => id === user?.id);
  const currentUserIsAdmin = member?.roles.includes("admin") == true;

  const sortedPendingMembers = useMemo(() => {
    return pendingWorkspaceMembers?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
  }, [pendingWorkspaceMembers]);

  const sortedMembers = useMemo(() => {
    return members?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
  }, [members]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="shrink-0">
        <InviteTeamMember workspaceId={workspaceId} />
      </div>

      <div className="flex flex-col gap-1 overflow-auto shrink grow">
        {isLoading && <div className="text-slate-500">Loading...</div>}{" "}
        {error && (
          <div
            className="bg-rose-400 text-rose-900 px-2 py-1 rounded font-bold inline-block"
            role="alert"
          >
            {error.message}
          </div>
        )}
        {sortedPendingMembers.map((member, index) => (
          <PendingWorkspaceMemberRow key={index} member={member} />
        ))}
        {sortedMembers.map((member, index) => (
          <TeamMemberRow
            currentUserId={user.id}
            currentUserIsAdmin={currentUserIsAdmin}
            key={index}
            member={member}
          />
        ))}
      </div>

      {invitationCode && (
        <div className="shrink-0">
          <InvitationLink invitationCode={invitationCode} />
        </div>
      )}
    </div>
  );
}
