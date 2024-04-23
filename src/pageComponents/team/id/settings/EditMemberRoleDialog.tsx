import { Button } from "@/components/Button";
import { ModalDialog } from "@/components/ModalDialog";
import { Select } from "@/components/Select";
import { useUpdateWorkspaceMemberRoles } from "@/graphql/queries/useUpdateWorkspaceMemberRoles";
import { WorkspaceMember } from "@/graphql/types";
import {
  MEMBER_ROLE_OPTIONS,
  MemberRoleOption,
  getMembershipRoles,
  getRoleOption,
} from "@/pageComponents/team/id/settings/constants";
import { useState } from "react";

export function EditMemberRoleDialog({
  member,
  onDismiss,
}: {
  member: WorkspaceMember;
  onDismiss: () => void;
}) {
  const [isPending, setIsPending] = useState(false);

  const [memberRole, setMemberRole] = useState<MemberRoleOption>(
    getRoleOption(member.roles)
  );

  const { updateWorkspaceMemberRoles } = useUpdateWorkspaceMemberRoles();

  const updateRoles = async () => {
    setIsPending(true);
    try {
      await updateWorkspaceMemberRoles(
        member.membershipId,
        getMembershipRoles(memberRole)
      );
    } finally {
      setIsPending(false);
      onDismiss();
    }
  };

  return (
    <ModalDialog
      data-test-id="Dialog-EditMemberRole"
      onDismiss={onDismiss}
      title={member.name}
    >
      <Select
        onChange={(option) => {
          setMemberRole(option as MemberRoleOption);
        }}
        options={MEMBER_ROLE_OPTIONS}
        value={memberRole}
      />
      <div className="flex flex-row gap-2 justify-end">
        <Button color="secondary" onClick={onDismiss} variant="outline">
          Cancel
        </Button>
        <Button onClick={updateRoles}>Update Role</Button>
      </div>
    </ModalDialog>
  );
}
