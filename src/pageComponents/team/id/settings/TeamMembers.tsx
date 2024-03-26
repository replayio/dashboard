import { Icon } from "@/components/Icon";
import { InvitationLink } from "@/pageComponents/team/id/settings/InvitationLink";
import { InviteTeamMember } from "@/pageComponents/team/id/settings/InviteTeamMember";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { getPrimaryRole } from "@/utils/user";
import { useMemo } from "react";
import { WorkspaceMember } from "@/graphql/types";

export function TeamMembers({
  id,
  invitationCode,
}: {
  id: string;
  invitationCode: string | null;
}) {
  const { error, isLoading, members } = useGetWorkspaceMembers(id);

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
        <InviteTeamMember workspaceId={id} />
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
                <div
                  className="flex flex-row items-center gap-2"
                  data-test-name="TeamMembers-MemberRow"
                  key={index}
                >
                  <div className="flex items-center justify-center rounded-full w-8 h-8 overflow-hidden shrink-0 bg-slate-500">
                    {member.isPending ? (
                      <Icon className="w-6 h-6 text-slate-300" type="email" />
                    ) : member.picture ? (
                      <img
                        alt={`${member.name} avatar`}
                        className="w-full h-full"
                        referrerPolicy="no-referrer"
                        src={member.picture}
                      />
                    ) : null}
                  </div>
                  <div className="truncate">{member.name}</div>
                  {member.isPending && (
                    <div className="shrink-0 text-sm text-yellow-300">
                      (pending)
                    </div>
                  )}
                </div>
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
