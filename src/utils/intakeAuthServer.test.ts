import { describe, it, expect } from "@jest/globals";
import jwt from "jsonwebtoken";
import {
  getAuthSubFromAccessToken,
  getEmailFromAccessToken,
  getNameFromAccessToken,
} from "@/utils/intakeAuthServer";

function makeToken(payload: Record<string, unknown>): string {
  return jwt.sign(payload, "test-secret");
}

describe("getAuthSubFromAccessToken", () => {
  it("should extract sub claim", () => {
    const token = makeToken({ sub: "auth0|user123" });
    expect(getAuthSubFromAccessToken(token)).toBe("auth0|user123");
  });

  it("should return null for missing sub", () => {
    const token = makeToken({ email: "a@b.com" });
    expect(getAuthSubFromAccessToken(token)).toBeNull();
  });

  it("should return null for invalid token", () => {
    expect(getAuthSubFromAccessToken("not-a-jwt")).toBeNull();
  });
});

describe("getEmailFromAccessToken", () => {
  it("should extract email from standard claim", () => {
    const token = makeToken({ email: "alice@example.com" });
    expect(getEmailFromAccessToken(token)).toBe("alice@example.com");
  });

  it("should extract email from replay.io namespace", () => {
    const token = makeToken({ "https://replay.io/email": "bob@replay.io" });
    expect(getEmailFromAccessToken(token)).toBe("bob@replay.io");
  });

  it("should extract email from replay.io/claims namespace", () => {
    const token = makeToken({ "https://replay.io/claims/email": "carol@replay.io" });
    expect(getEmailFromAccessToken(token)).toBe("carol@replay.io");
  });

  it("should return null when no email claim exists", () => {
    const token = makeToken({ sub: "user123" });
    expect(getEmailFromAccessToken(token)).toBeNull();
  });
});

describe("getNameFromAccessToken", () => {
  it("should extract name claim", () => {
    const token = makeToken({ name: "Alice Smith" });
    expect(getNameFromAccessToken(token)).toBe("Alice Smith");
  });

  it("should fall back to nickname", () => {
    const token = makeToken({ nickname: "alice" });
    expect(getNameFromAccessToken(token)).toBe("alice");
  });

  it("should fall back to replay.io namespace", () => {
    const token = makeToken({ "https://replay.io/name": "Bob" });
    expect(getNameFromAccessToken(token)).toBe("Bob");
  });

  it("should return undefined when no name exists", () => {
    const token = makeToken({ sub: "user123" });
    expect(getNameFromAccessToken(token)).toBeUndefined();
  });
});
