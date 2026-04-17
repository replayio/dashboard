import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { getAllowedAuthOrigins, sanitizeReturnToPath } from "@/utils/authValidation";

const savedEnv: Record<string, string | undefined> = {};
const envKeys = [
  "AUTH0_BASE_URL",
  "APP_URL",
  "DEVTOOLS_URL",
  "NEXT_PUBLIC_VERCEL_URL",
  "AUTH0_ALLOWED_ORIGINS",
];

beforeEach(() => {
  for (const key of envKeys) savedEnv[key] = process.env[key];
});

afterEach(() => {
  for (const key of envKeys) {
    if (savedEnv[key] !== undefined) {
      process.env[key] = savedEnv[key];
    } else {
      delete process.env[key];
    }
  }
});

function setEnv(overrides: Record<string, string | undefined>) {
  for (const key of envKeys) delete process.env[key];
  for (const [k, v] of Object.entries(overrides)) {
    if (v !== undefined) process.env[k] = v;
  }
}

describe("getAllowedAuthOrigins", () => {
  it("should include AUTH0_BASE_URL", () => {
    setEnv({ AUTH0_BASE_URL: "https://app.replay.io" });
    const origins = getAllowedAuthOrigins();
    expect(origins.has("https://app.replay.io")).toBe(true);
  });

  it("should include APP_URL when set", () => {
    setEnv({ AUTH0_BASE_URL: "https://a.com", APP_URL: "https://b.com" });
    const origins = getAllowedAuthOrigins();
    expect(origins.has("https://b.com")).toBe(true);
  });

  it("should include DEVTOOLS_URL when set", () => {
    setEnv({ AUTH0_BASE_URL: "https://a.com", DEVTOOLS_URL: "https://devtools.replay.io" });
    const origins = getAllowedAuthOrigins();
    expect(origins.has("https://devtools.replay.io")).toBe(true);
  });

  it("should fall back to default devtools URL when DEVTOOLS_URL is not set", () => {
    setEnv({ AUTH0_BASE_URL: "https://a.com" });
    const origins = getAllowedAuthOrigins();
    expect(origins.has("https://replay-devtools.vercel.app")).toBe(true);
  });

  it("should include Vercel preview URL when NEXT_PUBLIC_VERCEL_URL is set", () => {
    setEnv({
      AUTH0_BASE_URL: "https://a.com",
      NEXT_PUBLIC_VERCEL_URL: "my-preview-abc.vercel.app",
    });
    const origins = getAllowedAuthOrigins();
    expect(origins.has("https://my-preview-abc.vercel.app")).toBe(true);
  });

  it("should parse AUTH0_ALLOWED_ORIGINS as comma-separated list", () => {
    setEnv({
      AUTH0_BASE_URL: "https://a.com",
      AUTH0_ALLOWED_ORIGINS: "https://x.com, https://y.com ,https://z.com",
    });
    const origins = getAllowedAuthOrigins();
    expect(origins.has("https://x.com")).toBe(true);
    expect(origins.has("https://y.com")).toBe(true);
    expect(origins.has("https://z.com")).toBe(true);
  });

  it("should not include attacker-controlled origins", () => {
    setEnv({ AUTH0_BASE_URL: "https://app.replay.io" });
    const origins = getAllowedAuthOrigins();
    expect(origins.has("https://evil.com")).toBe(false);
  });
});

describe("sanitizeReturnToPath", () => {
  it("should return the path when it starts with /", () => {
    expect(sanitizeReturnToPath("/team/123")).toBe("/team/123");
    expect(sanitizeReturnToPath("/")).toBe("/");
    expect(sanitizeReturnToPath("/user/settings")).toBe("/user/settings");
  });

  it("should return / for undefined or empty input", () => {
    expect(sanitizeReturnToPath(undefined)).toBe("/");
    expect(sanitizeReturnToPath("")).toBe("/");
  });

  it("should reject protocol-relative URLs", () => {
    expect(sanitizeReturnToPath("//evil.com")).toBe("/");
    expect(sanitizeReturnToPath("//evil.com/path")).toBe("/");
  });

  it("should reject absolute URLs", () => {
    expect(sanitizeReturnToPath("https://evil.com")).toBe("/");
    expect(sanitizeReturnToPath("http://evil.com/path")).toBe("/");
  });

  it("should reject paths that don't start with /", () => {
    expect(sanitizeReturnToPath("evil.com")).toBe("/");
    expect(sanitizeReturnToPath("javascript:alert(1)")).toBe("/");
  });

  it("should preserve query strings and fragments on valid paths", () => {
    expect(sanitizeReturnToPath("/team/123?tab=settings")).toBe("/team/123?tab=settings");
    expect(sanitizeReturnToPath("/page#section")).toBe("/page#section");
  });
});
