import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { WorkspaceMember } from "@/graphql/types";
import { useRemoveUserFromWorkspace } from "@/graphql/useRemoveUserFromWorkspace";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { EditMemberRoleDialog } from "@/pageComponents/team/id/settings/EditMemberRoleDialog";
import { Roles } from "@/pageComponents/team/id/settings/constants";
import { getPrimaryRole } from "@/utils/user";
import { useState } from "react";

export function TeamMemberRow({
  currentUserId,
  currentUserIsAdmin,
  member,
}: {
  currentUserId: string;
  currentUserIsAdmin: boolean;
  member: WorkspaceMember;
}) {
  const [isPending, setIsPending] = useState(false);
  const [showEditMemberRoleDialog, setShowEditMemberRoleDialog] = useState(false);

  const { removeUserFromWorkspace } = useRemoveUserFromWorkspace();

  const { confirmationDialog: confirmRemoveDialog, showConfirmationDialog: showRemoveDialog } =
    useConfirmDialog(
      async (confirmRemove: boolean) => {
        if (confirmRemove) {
          setIsPending(true);

          try {
            await removeUserFromWorkspace(member.membershipId);
          } finally {
            setIsPending(false);
          }
        }
      },
      {
        cancelButtonLabel: "No",
        confirmButtonLabel: "Yes, remove",
        message: `Are you sure you want to remove ${member.name} from this team?`,
        title: member.name,
      }
    );

  return (
    <div
      className="flex flex-row items-center gap-3 px-3 py-2 rounded-md border border-border bg-card hover:bg-accent/50 transition-colors"
      data-test-name="TeamMembers-MemberRow"
    >
      {currentUserIsAdmin ? (
        <>
          <IconButton
            disabled={isPending}
            iconType="edit"
            onClick={() => setShowEditMemberRoleDialog(true)}
            title="Edit role"
          />
          {showEditMemberRoleDialog && (
            <EditMemberRoleDialog
              currentUserId={currentUserId}
              member={member}
              onDismiss={() => setShowEditMemberRoleDialog(false)}
            />
          )}
          <IconButton
            disabled={isPending || currentUserId === member.id}
            iconType="delete"
            onClick={showRemoveDialog}
            title="Remove member"
          />
          {confirmRemoveDialog}
        </>
      ) : (
        <div className="w-[4.5rem] shrink-0" />
      )}
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
      <div className="flex flex-row gap-1.5 shrink-0">
        {member.roles.includes(Roles.Admin.graphQLValue) && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-md bg-destructive/20 text-destructive"
            data-test-name="TeamMembers-Role-Admin"
          >
            Admin
          </span>
        )}
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
          data-test-name={`TeamMembers-Role-${getPrimaryRole(member.roles).label}`}
        >
          {getPrimaryRole(member.roles).label}
        </span>
      </div>
    </div>
  );
}
