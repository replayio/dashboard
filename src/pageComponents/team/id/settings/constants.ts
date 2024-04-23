// Copied from the backend: src/graphql-api/models.ts
export enum WorkspaceUserRole {
  None = 0,
  // Can view objects within a workspace
  Viewer = 1 << 0,
  // Can run evaluations on a replay in the workspace
  Debugger = 1 << 1,
  // Can upload new objects to a workspace
  Contributor = 1 << 2,
  // Can manage workspace including billing
  Admin = 1 << 7,
}

export type MemberRoleOption = {
  label: string;
  value: number;
};

const ADMIN: MemberRoleOption = {
  label: "Admin",
  value: WorkspaceUserRole.Admin,
};
const CONTRIBUTOR: MemberRoleOption = {
  label: "Contributor",
  value: WorkspaceUserRole.Contributor,
};
const DEVELOPER: MemberRoleOption = {
  label: "Developer",
  value: WorkspaceUserRole.Debugger,
};
const NO_ROLE: MemberRoleOption = {
  label: "None",
  value: WorkspaceUserRole.None,
};
const VIEWER: MemberRoleOption = {
  label: "Viewer",
  value: WorkspaceUserRole.Viewer,
};

export const MEMBER_ROLE_OPTIONS = [
  NO_ROLE,
  VIEWER,
  CONTRIBUTOR,
  DEVELOPER,
  ADMIN,
];

export const DEFAULT_MEMBER_ROLE_OPTION = NO_ROLE;

export function getRoleOption(membershipRoles: string[]) {
  if (membershipRoles.includes("admin")) {
    return ADMIN;
  } else if (membershipRoles.includes("debugger")) {
    return DEVELOPER;
  } else if (membershipRoles.includes("contributor")) {
    return CONTRIBUTOR;
  } else {
    return VIEWER;
  }
}

export function getMembershipRoles(role: MemberRoleOption) {
  switch (role) {
    case ADMIN:
      return ["viewer", "contributor", "admin", "debugger"];
    case DEVELOPER:
      return ["viewer", "contributor", "debugger"];
    case CONTRIBUTOR:
      return ["viewer", "contributor"];
    case VIEWER:
      return ["viewer"];
    case NO_ROLE:
    default:
      return [];
  }
}
