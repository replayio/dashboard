import { Workspace, WorkspaceRecording } from "@/graphql/types";

export function canDeleteRecording(
  recording: WorkspaceRecording,
  userId: string,
  workspaces: Workspace[]
) {
  if (userId == recording.owner?.id) {
    return true;
  } else {
    if (recording.workspaceId && workspaces.find(({ id }) => id === recording.workspaceId)) {
      return true;
    }
  }

  return false;
}

export function getPrimaryRole(roles: string[]) {
  if (roles.includes("admin")) {
    return "Admin";
  } else if (roles.includes("debugger")) {
    return "Developer";
  } else if (roles.includes("contributor")) {
    return "Contributor";
  } else {
    return "User";
  }
}
