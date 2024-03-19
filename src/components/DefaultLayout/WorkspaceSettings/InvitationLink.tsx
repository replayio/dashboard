import { ClickToCopyString } from "@/components/ClickToCopyString";

export function InvitationLink({ invitationCode }: { invitationCode: string }) {
  if (!invitationCode) {
    return null;
  }

  return (
    <>
      <ClickToCopyString
        header={
          <div>
            <strong>Invite link</strong> (click to copy)
          </div>
        }
        value={`https://app.replay.io/team/invitation?code=${invitationCode}`}
      />
    </>
  );
}
