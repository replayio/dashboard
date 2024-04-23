import { SessionContext } from "@/components/SessionContext";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { WorkspaceMember } from "@/graphql/types";
import { InvitationLink } from "@/pageComponents/team/id/settings/InvitationLink";
import { InviteTeamMember } from "@/pageComponents/team/id/settings/InviteTeamMember";
import { TeamMemberRow } from "@/pageComponents/team/id/settings/TeamMemberRow";
import { getPrimaryRole } from "@/utils/user";
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

  const member = members?.find(({ id }) => id === user?.id);
  const currentUserIsAdmin = member?.roles.includes("admin") == true;

  const categorizedMembers = useMemo(() => {
    if (!members) {
      return {};
    }

    const categories: { [role: string]: WorkspaceMember[] } = {
      Admin: [],
      Developer: [],
      Contributor: [],
      Viewer: [],
    };

    members
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((member) => {
        const primaryRole = getPrimaryRole(member.roles);

        let members = categories[primaryRole];
        if (members == null) {
          categories[primaryRole] = members = [];
        }

        members.push(member);
      });

    return categories;
  }, [members]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="shrink-0">
        <InviteTeamMember workspaceId={workspaceId} />
      </div>

      <div className="flex flex-col gap-4 overflow-auto shrink grow">
        {isLoading && <div className="text-slate-500">Loading...</div>}{" "}
        {error && (
          <div
            className="bg-rose-400 text-rose-900 px-2 py-1 rounded font-bold inline-block"
            role="alert"
          >
            {error.message}
          </div>
        )}
        {Object.entries(categorizedMembers).map(([role, members]) =>
          members.length > 0 ? (
            <div
              className="flex flex-col gap-1"
              data-test-id={`TeamMembers-Role-${role}`}
              data-test-name="TeamMembers-Role"
              key={role}
            >
              <div className="text-lg" data-test-name="TeamMembers-RoleTitle">
                {role}s
              </div>
              {members.map((member, index) => (
                <TeamMemberRow
                  currentUserId={user.id}
                  currentUserIsAdmin={currentUserIsAdmin}
                  key={index}
                  member={member}
                />
              ))}
            </div>
          ) : null
        )}
      </div>

      {invitationCode && (
        <div className="shrink-0">
          <InvitationLink invitationCode={invitationCode} />
        </div>
      )}
    </div>
  );
}
