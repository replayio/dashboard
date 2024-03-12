"use client";

import { InvitationLink } from "@/components/LeftNavigation/WorkspaceSettings/InvitationLink";
import { InviteTeamMember } from "@/components/LeftNavigation/WorkspaceSettings/InviteTeamMember";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { getPrimaryRole } from "@/utils/user";

export function TeamMembers({
  id,
  invitationCode,
}: {
  id: string;
  invitationCode: string;
}) {
  const { error, loading, members } = useGetWorkspaceMembers(id);

  const sortedMembers = members
    .slice()
    .sort((a, b) => Number(b.isPending) - Number(a.isPending));

  return (
    <div className="flex flex-col gap-4">
      <InviteTeamMember workspaceId={id} />

      <div className="flex flex-col gap-1 max-h-40 overflow-auto">
        {loading && <div className="text-slate-500">Loading...</div>}{" "}
        {error && (
          <div
            className="bg-red-400 text-red-900 px-2 py-1 rounded font-bold inline-block"
            role="alert"
          >
            {error.message}
          </div>
        )}
        {sortedMembers.map((member, index) => (
          <div className="flex flex-row items-center gap-2" key={index}>
            {member.picture && (
              <img
                alt={`${member.name} avatar`}
                className="rounded-full w-8 h-8 shrink-0"
                src={member.picture}
              />
            )}
            <div className="truncate grow">{member.name}</div>
            <div className="truncate shrink-0 text-sm text-slate-300">
              {getPrimaryRole(member.roles)}{" "}
              {member.isPending && (
                <small className="text-yellow-500">(pending)</small>
              )}
            </div>
          </div>
        ))}
      </div>

      <InvitationLink invitationCode={invitationCode} />
    </div>
  );
}
