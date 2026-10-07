import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { Readable } from "stream";
import { NextApiRequest, NextApiResponse } from "next";

let savedUrl: string | undefined;
let savedApiKey: string | undefined;

beforeAll(() => {
  savedUrl = process.env.SELF_HEALING_URL;
  savedApiKey = process.env.SELF_HEALING_API_KEY;
});

afterAll(() => {
  if (savedUrl !== undefined) {
    process.env.SELF_HEALING_URL = savedUrl;
  } else {
    delete process.env.SELF_HEALING_URL;
  }
  if (savedApiKey !== undefined) {
    process.env.SELF_HEALING_API_KEY = savedApiKey;
  } else {
    delete process.env.SELF_HEALING_API_KEY;
  }
});

function setEnvConfigured() {
  process.env.SELF_HEALING_URL = "https://self-healing.example";
  process.env.SELF_HEALING_API_KEY = "test-key";
}

function createMockReqRes(body: Buffer = Buffer.from("{}"), method = "POST") {
  const req = Object.assign(Readable.from([body]), { method }) as unknown as NextApiRequest;

  const res = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(body: unknown) {
      res._body = body;
      return res;
    },
    setHeader(name: string, value: string) {
      res.headers[name] = value;
      return res;
    },
    end(body: unknown) {
      res._body = body;
      return res;
    },
    _body: undefined as unknown,
  };

  return {
    req,
    res: res as unknown as NextApiResponse & {
      _body: unknown;
      statusCode: number;
      headers: Record<string, string>;
    },
  };
}

describe("/api/self-healing/session", () => {
  it("should reject non-POST requests with 405", async () => {
    setEnvConfigured();
    jest.resetModules();
    const { default: handler } = await import("./session");

    const { req, res } = createMockReqRes(Buffer.from("{}"), "GET");
    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res.headers["Allow"]).toBe("POST");
    expect(res._body).toEqual({ error: "Method not allowed" });
  });

  it("should return 503 when SELF_HEALING_URL or SELF_HEALING_API_KEY is not configured", async () => {
    delete process.env.SELF_HEALING_URL;
    delete process.env.SELF_HEALING_API_KEY;
    jest.resetModules();
    const { default: handler } = await import("./session");

    const mockFetch = jest.fn<typeof global.fetch>();
    global.fetch = mockFetch;

    const { req, res } = createMockReqRes();
    await handler(req, res);

    expect(res.statusCode).toBe(503);
    expect(res._body).toEqual({ error: "Self Healing is not configured" });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should reject bodies over the 256 KiB Self Healing request limit with 413", async () => {
    setEnvConfigured();
    jest.resetModules();
    const { default: handler } = await import("./session");

    const mockFetch = jest.fn<typeof global.fetch>();
    global.fetch = mockFetch;

    const { req, res } = createMockReqRes(Buffer.alloc(256 * 1024 + 1, "a"));
    await handler(req, res);

    expect(res.statusCode).toBe(413);
    expect(res._body).toEqual({ error: "Capture exceeds Self Healing request limit" });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should forward the raw body verbatim and return the upstream status and body", async () => {
    setEnvConfigured();
    jest.resetModules();
    const { default: handler } = await import("./session");

    const upstreamBody = JSON.stringify({ status: "stored", session_id: "abc123" });
    const mockFetch = jest.fn<typeof global.fetch>().mockResolvedValue({
      status: 200,
      text: async () => upstreamBody,
    } as Response);
    global.fetch = mockFetch;

    const captureBody = Buffer.from(JSON.stringify({ batch: 1 }));
    const { req, res } = createMockReqRes(captureBody);
    await handler(req, res);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const call = mockFetch.mock.calls[0]!;
    const url = call[0] as unknown as URL;
    const init = call[1] as RequestInit;
    expect(url.toString()).toBe("https://self-healing.example/api/v1/connection/sessions");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({
      Authorization: "Bearer test-key",
      "Content-Type": "application/json",
    });
    expect(init.body).toEqual(captureBody);

    expect(res.statusCode).toBe(200);
    expect(res.headers["Content-Type"]).toBe("application/json");
    expect(res._body).toBe(upstreamBody);
  });

  it("should pass through the upstream error status and body unchanged", async () => {
    setEnvConfigured();
    jest.resetModules();
    const { default: handler } = await import("./session");

    const mockFetch = jest.fn<typeof global.fetch>().mockResolvedValue({
      status: 401,
      text: async () => JSON.stringify({ error: "invalid key" }),
    } as Response);
    global.fetch = mockFetch;

    const { req, res } = createMockReqRes();
    await handler(req, res);

    expect(res.statusCode).toBe(401);
    expect(res._body).toBe(JSON.stringify({ error: "invalid key" }));
  });
});
