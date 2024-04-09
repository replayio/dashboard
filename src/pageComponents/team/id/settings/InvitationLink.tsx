import { ClickToCopyString } from "@/components/ClickToCopyString";
import { URLS } from "@/constants";

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
        value={`${URLS.app}/team/invitation?code=${invitationCode}`}
      />
    </>
  );
}
