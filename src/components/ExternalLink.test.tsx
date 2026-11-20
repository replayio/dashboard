import { ExternalLink } from "@/components/ExternalLink";
import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { ReactNode } from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react-dom/test-utils";

describe("ExternalLink", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    // @ts-ignore
    global.IS_REACT_ACT_ENVIRONMENT = true;

    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    jest.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.restoreAllMocks();
  });

  function render(node: ReactNode) {
    act(() => root.render(node));
  }

  it.each([
    "https://github.com/replayio/dashboard/actions/runs/1",
    "http://ci.example.com/builds/1",
    "/team/1/runs",
    "//example.com/builds/1",
  ])("should render %s as a link", href => {
    render(
      <ExternalLink className="underline" href={href} title="Workflow">
        Workflow
      </ExternalLink>
    );

    const anchor = container.querySelector("a");
    expect(anchor?.getAttribute("href")).toBe(href);
    expect(anchor?.getAttribute("target")).toBe("_blank");
    expect(anchor?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(anchor?.getAttribute("class")).toBe("underline");
    expect(anchor?.getAttribute("title")).toBe("Workflow");
    expect(anchor?.textContent).toBe("Workflow");
  });

  it.each(["https://github.com/replayio/dashboard/actions/runs/1", "//example.com/builds/1"])(
    "should open %s without an opener",
    href => {
      render(<ExternalLink href={href}>Workflow</ExternalLink>);

      act(() => container.querySelector("a")?.click());

      expect(window.open).toHaveBeenCalledTimes(1);
      expect(window.open).toHaveBeenCalledWith(href, "_blank", "noopener");
    }
  );

  it("should ignore props it does not declare", () => {
    const href = "https://github.com/replayio/dashboard/actions/runs/1";
    const extra = { as: "/team/1/runs", rel: "opener", target: "_self" } as object;
    render(
      <ExternalLink {...extra} href={href}>
        Workflow
      </ExternalLink>
    );

    const anchor = container.querySelector("a");
    expect(anchor?.getAttribute("href")).toBe(href);
    expect(anchor?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(anchor?.getAttribute("target")).toBe("_blank");
  });

  it.each([
    "javascript:void 0",
    "data:text/plain,x",
    "vbscript:x",
    "mailto:support@example.com",
    "https://",
    "http://exa mple.com",
  ])("should render %s as plain text", href => {
    render(
      <ExternalLink className="underline" href={href}>
        Workflow
      </ExternalLink>
    );

    expect(container.querySelector("a")).toBeNull();
    expect(container.querySelector("[href]")).toBeNull();
    expect(container.textContent).toBe("Workflow");

    act(() => (container.firstElementChild as HTMLElement | null)?.click());

    expect(window.open).not.toHaveBeenCalled();
  });
});
