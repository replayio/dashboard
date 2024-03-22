import { Icon, IconType } from "@/components/Icon";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetWorkspaceMembers } from "@/graphql/queries/getWorkspaceMembers";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { User, Workspace, WorkspaceMember } from "@/graphql/types";
import { Billing } from "@/pageComponents/team/id/settings/Billing";
import { DeleteWorkspace } from "@/pageComponents/team/id/settings/DeleteWorkspace";
import { Organization } from "@/pageComponents/team/id/settings/Organization";
import { TeamMembers } from "@/pageComponents/team/id/settings/TeamMembers";
import { WorkspaceApiKeys } from "@/pageComponents/team/id/settings/WorkspaceApiKeys";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type Panel = { children: ReactNode; icon: IconType; label: string };

export function WorkspaceSettings({ id: workspaceId }: { id: string }) {
  const { user } = useCurrentUser();
  const { members } = useGetWorkspaceMembers(workspaceId);

  const { workspaces } = useNonPendingWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);

  if (user == null || members == null || workspace == null) {
    return <LoadingSpinner />;
  }

  return <Panel members={members} user={user} workspace={workspace} />;
}

function Panel({
  members,
  user,
  workspace,
}: {
  members: WorkspaceMember[];
  user: User;
  workspace: Workspace;
}) {
  const currentMember = members?.find((member) => member.id === user?.id);
  const isAdmin = currentMember?.roles.includes("admin");

  const [currentId, setCurrentId] = useState("members");

  if (workspace == null) {
    return <LoadingSpinner />;
  }

  let content: ReactNode = null;
  switch (currentId) {
    case "api-keys": {
      content = <WorkspaceApiKeys workspaceId={workspace.id} />;
      break;
    }
    case "billing": {
      content = <Billing workspaceId={workspace.id} />;
      break;
    }
    case "delete": {
      content = <DeleteWorkspace id={workspace.id} />;
      break;
    }
    case "members": {
      content = (
        <TeamMembers
          id={workspace.id}
          invitationCode={workspace.invitationCode}
        />
      );
      break;
    }
    case "organization": {
      content = <Organization id={workspace.id} />;
      break;
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      <nav className="flex flex-row w-full bg-slate-800 text-white overflow-auto shrink-0 rounded">
        {workspace.isOrganization && (
          <Item
            currentId={currentId}
            icon="organization"
            label="Organization"
            id="organization"
            setId={setCurrentId}
          />
        )}
        <Item
          currentId={currentId}
          icon="team-members"
          label="Members"
          id="members"
          setId={setCurrentId}
        />
        {isAdmin && (
          <Item
            currentId={currentId}
            icon="billing"
            label="Billing"
            id="billing"
            setId={setCurrentId}
          />
        )}
        <Item
          currentId={currentId}
          icon="api-keys"
          label="API keys"
          id="api-keys"
          setId={setCurrentId}
        />
        {isAdmin && (
          <Item
            currentId={currentId}
            icon="delete"
            label="Delete"
            id="delete"
            setId={setCurrentId}
          />
        )}
      </nav>
      <div className="h-full overflow-auto bg-slate-800 p-2 rounded">
        {content}
      </div>
    </div>
  );
}

function Item({
  currentId,
  icon,
  label,
  id,
  setId,
}: {
  currentId: string;
  icon: IconType;
  label: string;
  id: string;
  setId: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div
      className={`flex flex-row gap-2 items-center px-2 py-1 transition cursor-pointer hover:text-sky-500 ${
        currentId === id ? "text-sky-500" : "text-white"
      }`}
      onClick={() => setId(id)}
    >
      <Icon className="w-6 h-6" type={icon} />
      {label}
    </div>
  );
}
