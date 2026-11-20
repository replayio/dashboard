/**
 * @jest-environment node
 */
import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { COOKIES } from "@/constants";
import auth from "@/pages/api/auth/[auth0]";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const env = { ...process.env };

beforeEach(() => {
  process.env.AUTH0_SECRET = "a-test-secret-that-is-at-least-32-characters-long";
  // nothing listens here, so login fails fast without leaving the machine
  process.env.AUTH0_ISSUER_BASE_URL = "https://127.0.0.1:1";
  process.env.AUTH0_BASE_URL = "https://app.replay.io";
  delete process.env.NEXT_PUBLIC_AUTH0_BASE_URL;
  process.env.AUTH0_CLIENT_ID = "test-client";
  process.env.AUTH0_CLIENT_SECRET = "test-client-secret";
});

afterEach(() => {
  process.env = { ...env };
});

// no session cookie, so on logout the auth0 library redirects to returnTo itself
async function call(
  route: "login" | "logout",
  query: Record<string, string>,
  headers: Record<string, string>
) {
  const req = {
    method: "GET",
    url: `/api/auth/${route}?${new URLSearchParams(query)}`,
    query: { auth0: route, ...query },
    headers,
    cookies: {},
    socket: {},
  } as unknown as NextApiRequest;
  let location: string | undefined;
  let returnToCookie: string | undefined;
  const res: Record<string, unknown> = {
    statusCode: 200,
    writableEnded: false,
    status: jest.fn(() => res),
    setHeader: jest.fn((name: string, value: string | string[]) => {
      for (const v of [value].flat()) {
        returnToCookie ??= cookie.parse(v)[COOKIES.authReturnTo];
      }
    }),
    getHeader: jest.fn(),
    redirect: jest.fn((status: number, url: string) => {
      location = url;
    }),
    end: jest.fn(),
  };
  await auth(req, res as unknown as NextApiResponse);
  return { location, returnToCookie };
}

describe("auth api logout", () => {
  it.each([
    [{ origin: "https://app.replay.io" }, { host: "app.replay.io" }, "https://app.replay.io/"],
    [
      { origin: "https://dashboard-git-branch-example.vercel.app" },
      { host: "dashboard-git-branch-example.vercel.app" },
      "https://dashboard-git-branch-example.vercel.app/",
    ],
    [{ origin: "http://localhost:8080" }, { host: "localhost:8080" }, "http://localhost:8080/"],
    [
      { origin: "http://192.168.1.5:8080" },
      { host: "192.168.1.5:8080" },
      "http://192.168.1.5:8080/",
    ],
    // devtools on localhost:8081 proxying to us under next dev
    [
      { origin: "http://localhost:8081", returnTo: "/login" },
      { host: "localhost:8080", "x-forwarded-host": "localhost:8081" },
      "http://localhost:8081/login",
    ],
    [
      { returnTo: "/verify-email?signIn=1&returnTo=%2Fteam%2F1" },
      { host: "app.replay.io" },
      "https://app.replay.io/verify-email?signIn=1&returnTo=%2Fteam%2F1",
    ],
  ])("should send %j on %j back to %j", async (query, headers, expected) => {
    const { location, returnToCookie } = await call("logout", query, headers);
    expect(location).toBe(expected);
    expect(returnToCookie).toBe(expected);
  });

  it.each([
    [{ origin: "https://example.com", returnTo: "/login" }, "https://app.replay.io/login"],
    [{ origin: "https://app.replay.io.example.com" }, "https://app.replay.io/"],
    [{ origin: "https://x@app.replay.io" }, "https://app.replay.io/"],
    [{ origin: "http://app.replay.io" }, "http://app.replay.io/"],
    [{ origin: "javascript://app.replay.io" }, "https://app.replay.io/"],
    [{ returnTo: ".example.com/" }, "https://app.replay.io/.example.com/"],
    [{ returnTo: "@example.com/" }, "https://app.replay.io/@example.com/"],
    [{ returnTo: "//example.com" }, "https://app.replay.io/"],
    [{ returnTo: "https://example.com" }, "https://app.replay.io/"],
  ])("should keep %j on our host as %j", async (query, expected) => {
    expect((await call("logout", query, { host: "app.replay.io" })).location).toBe(expected);
  });

  it("should use the base url when the caller's host isn't the one this request came in on", async () => {
    const query = { origin: "https://devtools-git-branch-example.vercel.app", returnTo: "/login" };
    const headers = { host: "dashboard.example.com", "x-forwarded-host": "dashboard.example.com" };
    expect((await call("logout", query, headers)).location).toBe("https://app.replay.io/login");
  });

  it.each([[{ returnTo: "/login" }], [{ origin: "https://example.com", returnTo: "/login" }]])(
    "should fall back to NEXT_PUBLIC_AUTH0_BASE_URL like the auth0 sdk does for %j",
    async query => {
      delete process.env.AUTH0_BASE_URL;
      process.env.NEXT_PUBLIC_AUTH0_BASE_URL = "dashboard-git-branch-example.vercel.app";
      const { location, returnToCookie } = await call("logout", query, {
        host: "dashboard.example.com",
      });
      expect(location).toBe("https://dashboard-git-branch-example.vercel.app/login");
      expect(returnToCookie).toBe("https://dashboard-git-branch-example.vercel.app/login");
    }
  );

  it.each([
    [{ returnTo: "/login" }, { host: "app.replay.io" }, "https://app.replay.io/login"],
    [
      { returnTo: "/login" },
      { host: "localhost:8080", "x-forwarded-proto": "http" },
      "http://localhost:8080/login",
    ],
    [{ origin: "https://example.com" }, { host: "app.replay.io" }, "https://app.replay.io/"],
    [{ returnTo: "/login" }, {}, "/"],
  ])(
    "should fall back to the request's own host for %j on %j with no base url set",
    async (query, headers, expected) => {
      delete process.env.AUTH0_BASE_URL;
      expect((await call("logout", query, headers)).returnToCookie).toBe(expected);
    }
  );
});

describe("auth api login", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should keep the caller's origin, which devtools sends from its own domain", async () => {
    const { returnToCookie } = await call(
      "login",
      { origin: "https://devtools-git-branch-example.vercel.app", returnTo: "/recording/abc" },
      { host: "dashboard.example.com" }
    );
    expect(returnToCookie).toBe("https://devtools-git-branch-example.vercel.app/recording/abc");
  });

  it("should use the base url when no origin is sent", async () => {
    const { returnToCookie } = await call(
      "login",
      { returnTo: "/team/1" },
      { host: "app.replay.io" }
    );
    expect(returnToCookie).toBe("https://app.replay.io/team/1");
  });
});
