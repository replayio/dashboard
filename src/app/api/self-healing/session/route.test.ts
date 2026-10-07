/**
 * @jest-environment node
 *
 * The handler uses the fetch-API globals (Request.text, Response.json) that exist
 * in Next.js server runtimes but not in the jsdom test environment. Explicit
 * @jest/globals imports keep the cypress-bundled chai types from shadowing expect.
 */
import { describe, it, expect, jest, beforeEach, afterAll } from "@jest/globals";
import * as undici from "undici";
import { POST } from "@/app/api/self-healing/session/route";

// CI runs the unit tests on Node 16, which predates the fetch-API globals that
// Next.js server code (and this handler) assumes. Backfill them from undici.
// Handlers resolve these globals at call time, so a top-level backfill is enough.
// Namespace access keeps the DOM-global names (Request, Response) unshadowed.
const globalsWithFetch = globalThis as unknown as Record<string, unknown>;
if (!globalsWithFetch.Response) {
  globalsWithFetch.Response = undici.Response;
  globalsWithFetch.Request = undici.Request;
  globalsWithFetch.fetch = undici.fetch;
}

const upstreamBody = JSON.stringify({ status: "stored", session_id: "abc123" });

// Route inputs/outputs are plain stubs: jsdom doesn't provide the fetch API
// globals, and the handler only relies on `text()` on the request.
function makeRequest(body: unknown): Request {
  return {
    text: () => Promise.resolve(typeof body === "string" ? body : JSON.stringify(body)),
  } as unknown as Request;
}

function mockUpstream(status: number, body: string): Response {
  return { status, text: () => Promise.resolve(body) } as unknown as Response;
}

describe("self-healing session forwarding route", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    global.fetch = jest.fn<typeof global.fetch>();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns 500 when SELF_HEALING_URL is missing", async () => {
    delete process.env.SELF_HEALING_URL;
    process.env.SELF_HEALING_API_KEY = "test-key";

    const response = await POST(makeRequest({}));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      error: "Self Healing integration is not configured on this deployment",
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns 500 when SELF_HEALING_API_KEY is missing", async () => {
    process.env.SELF_HEALING_URL = "https://self-healing.replay.io";
    delete process.env.SELF_HEALING_API_KEY;

    const response = await POST(makeRequest({}));

    expect(response.status).toBe(500);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("forwards the request body to the sessions endpoint with a bearer token", async () => {
    process.env.SELF_HEALING_URL = "https://self-healing.replay.io";
    process.env.SELF_HEALING_API_KEY = "test-key";
    global.fetch = jest
      .fn<typeof global.fetch>()
      .mockResolvedValue(mockUpstream(200, upstreamBody));

    const payload = { session_url: "https://fs.replay.io/s/123" };
    const response = await POST(makeRequest(payload));

    expect(global.fetch).toHaveBeenCalledWith(
      new URL("https://self-healing.replay.io/api/v1/connection/sessions"),
      {
        method: "POST",
        headers: {
          Authorization: "Bearer test-key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    expect(response.status).toBe(200);
    expect(await response.text()).toBe(upstreamBody);
  });

  it("passes through the upstream status code and body on errors", async () => {
    process.env.SELF_HEALING_URL = "https://self-healing.replay.io";
    process.env.SELF_HEALING_API_KEY = "test-key";
    const upstreamError = JSON.stringify({ error: "bad session payload" });
    global.fetch = jest
      .fn<typeof global.fetch>()
      .mockResolvedValue(mockUpstream(400, upstreamError));

    const response = await POST(makeRequest({}));

    expect(response.status).toBe(400);
    expect(await response.text()).toBe(upstreamError);
  });
});
