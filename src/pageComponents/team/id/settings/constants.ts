export type WorkspaceUserRoleType = {
  bitmask: number;
  graphQLValue: string;
  label: string;
};

// Copied from the backend: src/graphqlapi/models.ts
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

export const Roles: Record<keyof typeof WorkspaceUserRole, WorkspaceUserRoleType> = {
  Admin: { bitmask: WorkspaceUserRole.Admin, graphQLValue: "admin", label: "Admin" },
  Contributor: {
    bitmask: WorkspaceUserRole.Contributor,
    graphQLValue: "contributor",
    label: "Contributor",
  },
  Debugger: { bitmask: WorkspaceUserRole.Debugger, graphQLValue: "debugger", label: "Developer" },
  None: { bitmask: WorkspaceUserRole.None, graphQLValue: "", label: "None" },
  Viewer: { bitmask: WorkspaceUserRole.Viewer, graphQLValue: "viewer", label: "Viewer" },
};

export const MEMBER_ROLE_OPTIONS = [Roles.Viewer, Roles.Debugger];
export const DEFAULT_MEMBER_ROLE_OPTION = Roles.Viewer;
