import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useInviteWorkspaceMember } from "@/graphql/queries/inviteWorkspaceMember";
import { useState } from "react";

export function InviteTeamMember({ workspaceId }: { workspaceId: string }) {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { inviteWorkspaceMember } = useInviteWorkspaceMember(() => {
    setIsPending(false);
    setEmail("");
  });

  const onConfirm = () => {
    if (email) {
      setIsPending(true);
      inviteWorkspaceMember(workspaceId, email);
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <Input
        disabled={isPending}
        onChange={email => setEmail(email)}
        onConfirm={onConfirm}
        placeholder="Email address"
        value={email}
      />
      <Button disabled={!email || isPending} onClick={onConfirm}>
        Invite
      </Button>
    </div>
  );
}
