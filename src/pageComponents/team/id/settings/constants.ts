export type WorkspaceUserRoleType = {
  bitmask: number;
  graphQLValue: string;
  label: string;
};

// Keep this in sync with the backend: src/graphqlapi/models.ts
export enum WorkspaceUserRole {
  None = 0b00000000,
  Viewer = 0b00000001,
  Debugger = 0b00000010,
  Contributor = 0b00000100,
  Admin = 0b10000000,
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
