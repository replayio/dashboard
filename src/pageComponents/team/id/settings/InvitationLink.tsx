import { ClickToCopyString } from "@/components/ClickToCopyString";

export function InvitationLink({ invitationCode }: { invitationCode: string }) {
  if (!invitationCode) {
    return null;
  }

  return (
    <div>
      <div className="text-sm font-medium mb-2">Invite link</div>
      <div className="text-sm text-muted-foreground mb-2">
        Share this link to invite new members. Click to copy.
      </div>
      <ClickToCopyString value={`https://app.replay.io/team/invitation?code=${invitationCode}`} />
    </div>
  );
}
