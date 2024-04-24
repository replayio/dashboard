import { Roles } from "@/pageComponents/team/id/settings/constants";
import {
  assignDebuggerRole,
  assignViewerRole,
  getPrimaryRole,
  toggleAdminRole,
} from "@/utils/user";

describe("utils/user", () => {
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
      expect(toggleAdminRole(true, ["debugger"])).toEqual(["admin", "debugger"]);
      expect(toggleAdminRole(true, ["viewer"])).toEqual(["admin", "viewer"]);
      expect(toggleAdminRole(true, ["contributor", "debugger"])).toEqual([
        "admin",
        "contributor",
        "debugger",
      ]);
      expect(toggleAdminRole(true, ["contributor", "viewer"])).toEqual([
        "admin",
        "contributor",
        "viewer",
      ]);
    });
    it("should remove an admin role", () => {
      expect(toggleAdminRole(false, ["admin", "debugger"])).toEqual(["debugger"]);
      expect(toggleAdminRole(false, ["admin", "viewer"])).toEqual(["viewer"]);
      expect(toggleAdminRole(false, ["admin", "contributor", "debugger"])).toEqual([
        "contributor",
        "debugger",
      ]);
      expect(toggleAdminRole(false, ["admin", "contributor", "viewer"])).toEqual([
        "contributor",
        "viewer",
      ]);
    });
  });

  describe("assignDebuggerRole", () => {
    it("should assign an debugger/developer role", () => {
      expect(assignDebuggerRole(["viewer"])).toEqual(["debugger"]);
      expect(assignDebuggerRole(["debugger"])).toEqual(["debugger"]);
      expect(assignDebuggerRole(["contributor", "viewer"])).toEqual(["contributor", "debugger"]);
      expect(assignDebuggerRole(["admin", "viewer"])).toEqual(["admin", "debugger"]);
      expect(assignDebuggerRole(["admin", "contributor", "viewer"])).toEqual([
        "admin",
        "contributor",
        "debugger",
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
