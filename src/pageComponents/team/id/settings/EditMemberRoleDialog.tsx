import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { ModalDialog } from "@/components/ModalDialog";
import { Select } from "@/components/Select";
import { useUpdateWorkspaceMemberRoles } from "@/graphql/queries/useUpdateWorkspaceMemberRoles";
import { WorkspaceMember } from "@/graphql/types";
import {
  MEMBER_ROLE_OPTIONS,
  MemberRoleOption,
  Roles,
} from "@/pageComponents/team/id/settings/constants";
import {
  assignDebuggerRole,
  assignViewerRole,
  getPrimaryRole,
  toggleAdminRole,
} from "@/utils/user";
import { useState } from "react";

export function EditMemberRoleDialog({
  currentUserId,
  member,
  onDismiss,
}: {
  currentUserId: string;
  member: WorkspaceMember;
  onDismiss: () => void;
}) {
  const [isPending, setIsPending] = useState(false);

  const [roles, setRoles] = useState<string[]>(member.roles);

  const { updateWorkspaceMemberRoles } = useUpdateWorkspaceMemberRoles();

  const updateRoles = async () => {
    setIsPending(true);
    try {
      await updateWorkspaceMemberRoles(member.membershipId, roles);
    } finally {
      setIsPending(false);
      onDismiss();
    }
  };

  const onSelectChange = (debuggerOrViewerRole: MemberRoleOption) => {
    if (debuggerOrViewerRole === Roles.Debugger) {
      setRoles(assignDebuggerRole(roles));
    } else {
      setRoles(assignViewerRole(roles));
    }
  };

  const onCheckboxChange = (isAdmin: boolean) => {
    setRoles(toggleAdminRole(isAdmin, roles));
  };

  return (
    <ModalDialog data-test-id="Dialog-EditMemberRole" onDismiss={onDismiss} title={member.name}>
      <Select
        onChange={onSelectChange}
        disabled={isPending}
        options={MEMBER_ROLE_OPTIONS}
        value={getPrimaryRole(roles)}
      />
      <Checkbox
        checked={roles.includes(Roles.Admin.graphQLValue)}
        disabled={isPending || currentUserId === member.id}
        label="Give admin permissions?"
        onChange={onCheckboxChange}
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
