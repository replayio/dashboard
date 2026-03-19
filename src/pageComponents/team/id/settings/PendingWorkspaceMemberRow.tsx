import { IconButton } from "@/components/IconButton";
import { useApproveWorkspaceMembershipRequest } from "@/graphql/queries/useApproveWorkspaceMembershipRequest";
import { useRejectWorkspaceMembershipRequest } from "@/graphql/queries/useRejectWorkspaceMembershipRequest";
import { PendingWorkspaceMember } from "@/graphql/types";
import { useState } from "react";

export function PendingWorkspaceMemberRow({ member }: { member: PendingWorkspaceMember }) {
  const [isPending, setIsPending] = useState(false);

  const { acceptRequest, error: approvalError } = useApproveWorkspaceMembershipRequest();
  const { error: rejectionError, rejectRequest } = useRejectWorkspaceMembershipRequest();

  const approve = async () => {
    try {
      setIsPending(true);
      await acceptRequest(member.id);
    } catch {
      setIsPending(false);
    }
  };

  const reject = async () => {
    try {
      setIsPending(true);
      await rejectRequest(member.id);
    } catch {
      setIsPending(false);
    }
  };

  return (
    <div
      className="flex flex-row items-center gap-3 px-3 py-2 rounded-md border border-border bg-card hover:bg-accent/50 transition-colors"
      data-test-name="TeamMembers-MemberRow"
    >
      <IconButton
        disabled={isPending}
        iconClassName="fill-green-500"
        iconType="approve-request"
        label="Approve"
        onClick={approve}
        title="Approve request"
      />
      <IconButton
        disabled={isPending}
        iconClassName="fill-red-500"
        iconType="reject-request"
        label="Deny"
        onClick={reject}
        title="Reject request"
      />
      <div className="flex items-center justify-center rounded-full w-9 h-9 overflow-hidden shrink-0 bg-muted">
        {member.picture ? (
          <img
            alt={`${member.name} avatar`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            src={member.picture}
          />
        ) : (
          <span className="text-sm font-medium text-muted-foreground">
            {member.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="truncate text-sm font-medium grow">{member.name}</div>
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0"
        data-test-name="TeamMembers-RequestedAccess"
      >
        Pending
      </span>
      {(approvalError || rejectionError) && (
        <div className="text-destructive text-xs shrink-0">
          {approvalError?.message}
          {rejectionError?.message}
        </div>
      )}
    </div>
  );
}
