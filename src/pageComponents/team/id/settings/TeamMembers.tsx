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
    <div className="flex flex-col gap-6 h-full">
      <div className="py-4 border-b border-border">
        <div className="text-sm font-medium mb-1">Invite by email</div>
        <div className="text-sm text-muted-foreground mb-3">
          Send an invitation to add a new team member.
        </div>
        <InviteTeamMember workspaceId={workspaceId} />
      </div>

      <div className="flex flex-col gap-3 overflow-auto grow">
        {isLoading && <div className="text-sm text-muted-foreground">Loading...</div>}
        {error && (
          <div
            className="bg-destructive/20 text-destructive px-3 py-2 rounded-md font-medium text-sm"
            role="alert"
          >
            {error.message}
          </div>
        )}
        {sortedPendingMembers.length > 0 && (
          <div>
            <div className="text-sm font-medium mb-2 text-muted-foreground">
              Pending invitations
            </div>
            <div className="flex flex-col gap-1">
              {sortedPendingMembers.map((member, index) => (
                <PendingWorkspaceMemberRow key={index} member={member} />
              ))}
            </div>
          </div>
        )}
        <div>
          <div className="text-sm font-medium mb-2">Members</div>
          <div className="flex flex-col gap-1">
            {sortedMembers.map((member, index) => (
              <TeamMemberRow
                currentUserId={user.id}
                currentUserIsAdmin={currentUserIsAdmin}
                key={index}
                member={member}
              />
            ))}
          </div>
        </div>
      </div>

      {invitationCode && (
        <div className="py-4 border-t border-border shrink-0">
          <InvitationLink invitationCode={invitationCode} />
        </div>
      )}
    </div>
  );
}
