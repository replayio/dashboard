import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { NextApiRequest, NextApiResponse } from "next";

let savedEnvToken: string | undefined;

beforeAll(() => {
  savedEnvToken = process.env.FORM_CARRY_TOKEN;
});

afterAll(() => {
  if (savedEnvToken !== undefined) {
    process.env.FORM_CARRY_TOKEN = savedEnvToken;
  } else {
    delete process.env.FORM_CARRY_TOKEN;
  }
});

function createMockReqRes(overrides: Partial<NextApiRequest> = {}) {
  const req = {
    method: "POST",
    body: { text: "hello", userEmail: "a@b.com", userName: "Test" },
    ...overrides,
  } as unknown as NextApiRequest;

  const res = {
    statusCode: 200,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(body: unknown) {
      res._body = body;
      return res;
    },
    send(body: unknown) {
      res._body = body;
      return res;
    },
    _body: undefined as unknown,
  };

  return { req, res: res as unknown as NextApiResponse & { _body: unknown; statusCode: number } };
}

describe("/api/feedback", () => {
  it("should reject non-POST requests with 405", async () => {
    process.env.FORM_CARRY_TOKEN = "test-token";
    jest.resetModules();
    const { default: handler } = await import("./feedback");

    const { req, res } = createMockReqRes({ method: "GET" });
    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res._body).toEqual({ error: "Method not allowed" });
  });

  it("should return 500 when FORM_CARRY_TOKEN is not configured", async () => {
    delete process.env.FORM_CARRY_TOKEN;
    jest.resetModules();
    const { default: handler } = await import("./feedback");

    const { req, res } = createMockReqRes();
    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._body).toEqual({ error: "Feedback service is not configured" });
  });

  it("should forward to FormCarry and return success on 200", async () => {
    process.env.FORM_CARRY_TOKEN = "test-token";
    jest.resetModules();
    const { default: handler } = await import("./feedback");

    const mockFetch = jest.fn<typeof global.fetch>().mockResolvedValue({
      status: 200,
      json: async () => ({ code: 200 }),
    } as Response);
    global.fetch = mockFetch;

    const { req, res } = createMockReqRes();
    await handler(req, res);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://formcarry.com/s/test-token",
      expect.objectContaining({ method: "POST" })
    );
    expect(res.statusCode).toBe(200);
    expect(res._body).toEqual({ success: true });
  });

  it("should return upstream error status on non-200 FormCarry response", async () => {
    process.env.FORM_CARRY_TOKEN = "test-token";
    jest.resetModules();
    const { default: handler } = await import("./feedback");

    global.fetch = jest.fn<typeof global.fetch>().mockResolvedValue({
      status: 429,
      text: async () => "rate limited",
    } as Response);

    const { req, res } = createMockReqRes();
    await handler(req, res);

    expect(res.statusCode).toBe(429);
    expect(res._body).toEqual({ error: true });
  });
});
