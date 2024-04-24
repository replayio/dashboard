import { Roles } from "@/pageComponents/team/id/settings/constants";
import {
  assignDebuggerRole,
  assignViewerRole,
  getDefaultPermissionBitmask,
  getPrimaryRole,
  toggleAdminRole,
} from "@/utils/user";

describe("utils/user", () => {
  describe("getDefaultPermissionBitmask", () => {
    it("should set the correct bitmask for a Debugger role", () => {
      expect(getDefaultPermissionBitmask(Roles.Debugger)).toBe(
        Roles.Debugger.bitmask | Roles.Contributor.bitmask
      );
    });

    it("should set the correct bitmask for a Viewer role", () => {
      expect(getDefaultPermissionBitmask(Roles.Viewer)).toBe(
        Roles.Viewer.bitmask | Roles.Contributor.bitmask
      );
    });

    it("should throw if an unsupported default role is specified", () => {
      expect(() => getDefaultPermissionBitmask(Roles.Contributor)).toThrow(
        `Unsupported default role: ${Roles.Contributor.label}`
      );
      expect(() => getDefaultPermissionBitmask(Roles.Admin)).toThrow(
        `Unsupported default role: ${Roles.Admin.label}`
      );
    });
  });

  describe("getPrimaryRole", () => {
    it("should identify an debugger/developer", () => {
      expect(getPrimaryRole(["debugger"])).toBe(Roles.Debugger);
      expect(getPrimaryRole(["contributor", "debugger"])).toBe(Roles.Debugger);
      expect(getPrimaryRole(["admin", "debugger"])).toBe(Roles.Debugger);
      expect(getPrimaryRole(["admin", "contributor", "debugger"])).toBe(Roles.Debugger);
    });

    it("should identify an viewer", () => {
      expect(getPrimaryRole(["viewer"])).toBe(Roles.Viewer);
      expect(getPrimaryRole(["contributor", "viewer"])).toBe(Roles.Viewer);
      expect(getPrimaryRole(["admin", "contributor", "viewer"])).toBe(Roles.Viewer);
    });
  });

  describe("toggleAdminRole", () => {
    it("should assign an admin role", () => {
      expect(toggleAdminRole(true, ["debugger", "viewer"])).toEqual([
        "admin",
        "debugger",
        "viewer",
      ]);
      expect(toggleAdminRole(true, ["viewer"])).toEqual(["admin", "viewer"]);
      expect(toggleAdminRole(true, ["contributor", "debugger", "viewer"])).toEqual([
        "admin",
        "contributor",
        "debugger",
        "viewer",
      ]);
      expect(toggleAdminRole(true, ["contributor", "viewer"])).toEqual([
        "admin",
        "contributor",
        "viewer",
      ]);
    });

    it("should remove an admin role", () => {
      expect(toggleAdminRole(false, ["admin", "debugger", "viewer"])).toEqual([
        "debugger",
        "viewer",
      ]);
      expect(toggleAdminRole(false, ["admin", "viewer"])).toEqual(["viewer"]);
      expect(toggleAdminRole(false, ["admin", "contributor", "debugger", "viewer"])).toEqual([
        "contributor",
        "debugger",
        "viewer",
      ]);
      expect(toggleAdminRole(false, ["admin", "contributor", "viewer"])).toEqual([
        "contributor",
        "viewer",
      ]);
    });
  });

  describe("assignDebuggerRole", () => {
    it("should assign an debugger/developer role", () => {
      expect(assignDebuggerRole(["viewer"])).toEqual(["debugger", "viewer"]);
      expect(assignDebuggerRole(["debugger", "viewer"])).toEqual(["debugger", "viewer"]);
      expect(assignDebuggerRole(["contributor", "viewer"])).toEqual([
        "contributor",
        "debugger",
        "viewer",
      ]);
      expect(assignDebuggerRole(["admin", "viewer"])).toEqual(["admin", "debugger", "viewer"]);
      expect(assignDebuggerRole(["admin", "contributor", "viewer"])).toEqual([
        "admin",
        "contributor",
        "debugger",
        "viewer",
      ]);
    });
  });

  describe("assignViewerRole", () => {
    it("should assign an viewer role", () => {
      expect(assignViewerRole([])).toEqual(["viewer"]);
      expect(assignViewerRole(["contributor"])).toEqual(["contributor", "viewer"]);
      expect(assignViewerRole(["debugger"])).toEqual(["viewer"]);
      expect(assignViewerRole(["viewer"])).toEqual(["viewer"]);
      expect(assignViewerRole(["admin", "debugger"])).toEqual(["admin", "viewer"]);
      expect(assignViewerRole(["admin", "viewer"])).toEqual(["admin", "viewer"]);
      expect(assignViewerRole(["admin", "contributor", "debugger"])).toEqual([
        "admin",
        "contributor",
        "viewer",
      ]);
    });
  });
});
