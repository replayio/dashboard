import { describe, it, expect } from "@jest/globals";
import { getSafeReturnPath } from "@/utils/getSafeReturnPath";

const origin = "https://app.replay.io";

describe("getSafeReturnPath", () => {
  it("should keep relative paths exactly", () => {
    expect(getSafeReturnPath("/", origin)).toBe("/");
    expect(getSafeReturnPath("/team/123/runs", origin)).toBe("/team/123/runs");
    expect(getSafeReturnPath("/team/123?tab=settings#members", origin)).toBe(
      "/team/123?tab=settings#members"
    );
    expect(getSafeReturnPath("/api/browser/auth", origin)).toBe("/api/browser/auth");
    expect(getSafeReturnPath("/intake?returnTo=%2Fhome", origin)).toBe("/intake?returnTo=%2Fhome");
    expect(getSafeReturnPath("/recording/abc?point=1&time=2", origin)).toBe(
      "/recording/abc?point=1&time=2"
    );
  });

  it("should reduce same-origin absolute urls to their path", () => {
    expect(getSafeReturnPath("https://app.replay.io/team/123?x=1#y", origin)).toBe(
      "/team/123?x=1#y"
    );
    expect(getSafeReturnPath("https://app.replay.io", origin)).toBe("/");
  });

  it("should use the fallback for missing values", () => {
    expect(getSafeReturnPath(null, origin)).toBe("/");
    expect(getSafeReturnPath(undefined, origin)).toBe("/");
    expect(getSafeReturnPath("", origin, "/home")).toBe("/home");
  });

  it("should reject other hosts", () => {
    expect(getSafeReturnPath("https://example.com", origin)).toBe("/");
    expect(getSafeReturnPath("https://example.com/team", origin, "/home")).toBe("/home");
    expect(getSafeReturnPath("http://app.replay.io/team", origin)).toBe("/");
    expect(getSafeReturnPath("https://app.replay.io.example.com/", origin)).toBe("/");
    expect(getSafeReturnPath("https://app.replay.io@example.com/", origin)).toBe("/");
  });

  it("should reject scheme-relative and backslash forms", () => {
    expect(getSafeReturnPath("//example.com", origin)).toBe("/");
    expect(getSafeReturnPath("/\\example.com", origin)).toBe("/");
    expect(getSafeReturnPath("\\\\example.com", origin)).toBe("/");
    expect(getSafeReturnPath("/\t/example.com", origin)).toBe("/");
    expect(getSafeReturnPath("/\n/example.com", origin)).toBe("/");
    expect(getSafeReturnPath(" //example.com", origin)).toBe("/");
  });

  it("should reject paths that resolve to a leading double slash", () => {
    expect(getSafeReturnPath("/.//example.com", origin)).toBe("/");
    expect(getSafeReturnPath("/..//example.com", origin)).toBe("/");
    expect(getSafeReturnPath("/a/..//example.com", origin)).toBe("/");
  });

  it("should reject other schemes", () => {
    expect(getSafeReturnPath("javascript:void 0", origin)).toBe("/");
    expect(getSafeReturnPath("JavaScript:void 0", origin)).toBe("/");
    expect(getSafeReturnPath("data:text/plain,hello", origin)).toBe("/");
    expect(getSafeReturnPath("vbscript:void 0", origin)).toBe("/");
    expect(getSafeReturnPath("mailto:someone@example.com", origin)).toBe("/");
    expect(getSafeReturnPath("blob:https://app.replay.io/abc", origin)).toBe("/");
  });

  it("should reject garbage", () => {
    expect(getSafeReturnPath("http://[", origin)).toBe("/");
    expect(getSafeReturnPath("https://", origin)).toBe("/");
    expect(getSafeReturnPath("/team", "not a url")).toBe("/");
  });

  it("should work for preview and local origins", () => {
    const preview = "https://dashboard-git-branch-example.vercel.app";
    expect(getSafeReturnPath("/team/1", preview)).toBe("/team/1");
    expect(getSafeReturnPath(`${preview}/team/1`, preview)).toBe("/team/1");
    expect(getSafeReturnPath("https://app.replay.io/team/1", preview)).toBe("/");
    expect(getSafeReturnPath("/team/1", "http://localhost:8080")).toBe("/team/1");
  });
});
