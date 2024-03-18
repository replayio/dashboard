import { Icon } from "@/components/Icon";
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
    ?.slice()
    .sort((a, b) => Number(b.isPending) - Number(a.isPending));

  return (
    <div className="flex flex-col gap-4 max-h-full">
      <div className="shrink-0">
        <InviteTeamMember workspaceId={id} />
      </div>

      <div className="flex flex-col gap-1 overflow-auto shrink">
        {loading && <div className="text-slate-500">Loading...</div>}{" "}
        {error && (
          <div
            className="bg-rose-400 text-rose-900 px-2 py-1 rounded font-bold inline-block"
            role="alert"
          >
            {error.message}
          </div>
        )}
        {sortedMembers?.map((member, index) => (
          <div className="flex flex-row items-center gap-2" key={index}>
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
            <div className="truncate grow">{member.name}</div>
            <div className="truncate shrink-0 text-sm text-slate-300">
              {getPrimaryRole(member.roles)}{" "}
              {member.isPending && (
                <small className="text-yellow-300">(pending)</small>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="shrink-0">
        <InvitationLink invitationCode={invitationCode} />
      </div>
    </div>
  );
}
