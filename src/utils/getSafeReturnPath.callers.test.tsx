import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SessionContext } from "@/components/SessionContext";
import { User } from "@/graphql/types";
import BrowserErrorPage from "@/pages/browser/error";
import IntakePage from "@/pages/intake";
import LoginPage from "@/pages/login";

// the global jest (not the @jest/globals import) so jest.mock gets hoisted above the imports
const mockPush = jest.fn();
const mockRouter = { push: mockPush, replace: jest.fn() };
let mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
}));

jest.mock("next/dynamic", () => () => () => null);

beforeEach(() => {
  mockPush.mockReset();
  mockSearchParams = new URLSearchParams();
});

describe("login page", () => {
  it.each([
    ["/team/1/runs?x=1", "/team/1/runs?x=1"],
    ["http://localhost/team/1", "/team/1"],
    ["javascript:void 0", "/"],
    ["https://example.com/team", "/"],
  ])("should continue from returnTo %j to %j", async (returnTo, expected) => {
    mockSearchParams = new URLSearchParams({ returnTo });
    render(
      <SessionContext.Provider value={{ accessToken: "", user: { name: "Test" } as User }}>
        <LoginPage />
      </SessionContext.Provider>
    );
    fireEvent.click(await screen.findByText("Continue with this account"));
    expect(mockPush).toHaveBeenCalledWith(expected);
  });
});

describe("browser error page", () => {
  it.each([
    ["/recording/abc", "/recording/abc"],
    ["javascript:void 0", "/"],
    ["//example.com", "/"],
    ["https://example.com", "/"],
  ])("should retry url %j as %j", (url, expected) => {
    render(<BrowserErrorPage message={null} type={null} url={url} />);
    fireEvent.click(screen.getByText("Try again"));
    expect(mockPush).toHaveBeenCalledWith(expected);
  });
});

describe("intake page", () => {
  const originalLocation = window.location;
  const originalFetch = global.fetch;
  const assign = jest.fn();

  beforeEach(() => {
    assign.mockReset();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { origin: "https://app.replay.io", assign },
    });
    // an intake that's already done redirects to returnTo without a click
    global.fetch = jest.fn(async () => ({
      status: 200,
      json: async () => ({ completed: true, authSub: "auth0|test" }),
    })) as unknown as typeof fetch;
  });

  afterEach(() => {
    Object.defineProperty(window, "location", { configurable: true, value: originalLocation });
    global.fetch = originalFetch;
  });

  it.each([
    ["/team/1/recordings?x=1", "/team/1/recordings?x=1"],
    ["/\\example.com", "/home"],
    ["/\t/example.com", "/home"],
    ["/.//example.com", "/home"],
    ["https://example.com", "/home"],
  ])("should return from returnTo %j to %j", async (returnTo, expected) => {
    mockSearchParams = new URLSearchParams({ returnTo });
    render(<IntakePage />);
    await waitFor(() => expect(assign).toHaveBeenCalledWith(expected));
  });
});
