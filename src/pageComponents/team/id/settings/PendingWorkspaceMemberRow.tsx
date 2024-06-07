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
    <div className="flex flex-row items-center gap-2" data-test-name="TeamMembers-MemberRow">
      <IconButton
        disabled={isPending}
        iconClassName="fill-green-400"
        iconType="approve-request"
        label="Approve"
        onClick={approve}
        title="Approve request"
      />
      <IconButton
        disabled={isPending}
        iconClassName="fill-red-400"
        iconType="reject-request"
        label="Deny"
        onClick={reject}
        title="Reject request"
      />

      <div className="flex items-center justify-center rounded-full w-8 h-8 overflow-hidden shrink-0 bg-slate-500">
        {member.picture ? (
          <img
            alt={`${member.name} avatar`}
            className="w-full h-full"
            referrerPolicy="no-referrer"
            src={member.picture}
          />
        ) : null}
      </div>

      {member.name}

      <div
        className="shrink-0 text-xs bg-yellow-300 text-yellow-950 px-1 rounded-sm"
        data-test-name="TeamMembers-RequestedAccess"
      >
        Requested Access
      </div>

      {(approvalError || rejectionError) && (
        <div className="text-rose-500 text-sm">
          {approvalError?.message}
          {rejectionError?.message}
        </div>
      )}
    </div>
  );
}
