import { Workspace, WorkspaceRecording } from "@/graphql/types";
import { WorkspaceUserRoleType, Roles } from "@/pageComponents/team/id/settings/constants";

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

export function getDefaultPermissionBitmask(role: WorkspaceUserRoleType) {
  switch (role) {
    case Roles.Debugger:
      return Roles.Debugger.bitmask | Roles.Contributor.bitmask;
    case Roles.Viewer:
      return Roles.Viewer.bitmask | Roles.Contributor.bitmask;
    default:
      throw Error(`Unsupported default role: ${role.label}`);
  }
}

export function getPrimaryRole(membershipRoles: string[]) {
  if (membershipRoles.includes("debugger")) {
    return Roles.Debugger;
  } else {
    return Roles.Viewer;
  }
}

export function toggleAdminRole(isAdmin: boolean, prevRoles: string[]) {
  let nextRoles = new Set(prevRoles);

  if (isAdmin) {
    nextRoles.add(Roles.Admin.graphQLValue);
  } else {
    nextRoles.delete(Roles.Admin.graphQLValue);
  }

  return [...nextRoles].sort();
}

export function assignDebuggerRole(prevRoles: string[]) {
  let nextRoles = new Set(prevRoles);
  nextRoles.add(Roles.Debugger.graphQLValue);

  return [...nextRoles].sort();
}

export function assignViewerRole(prevRoles: string[]) {
  let nextRoles = new Set(prevRoles);
  nextRoles.delete(Roles.Debugger.graphQLValue);
  nextRoles.add(Roles.Viewer.graphQLValue);

  return [...nextRoles].sort();
}
