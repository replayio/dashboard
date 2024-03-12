import { copyText } from "@/utils/copy";

export function InvitationLink({ invitationCode }: { invitationCode: string }) {
  if (!invitationCode) {
    return null;
  }

  const link = `https://app.replay.io/team/invitation?code=${invitationCode}`;

  const onClick = () => {
    copyText(link);
  };

  return (
    <div
      className="flex flex-col px-2 py-1 bg-slate-900 hover:bg-slate-950 rounded cursor-pointer"
      onClick={onClick}
    >
      <div>
        <strong>Invite link</strong> (click to copy)
      </div>
      <div className="truncate">{link}</div>
    </div>
  );
}
