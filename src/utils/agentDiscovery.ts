import { NextRequest, NextResponse } from "next/server";

/** Page paths with a matching markdown mirror under /agent/*.md (served via /agent/markdown/[slug]). */
const PATH_TO_MARKDOWN_SLUG: Record<string, string> = {
  "/": "home",
  "/home": "home",
  "/login": "login",
  "/releases": "releases",
  "/recording": "recording",
};

export function acceptsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get("accept") ?? "";
  return /\btext\/markdown\b/i.test(accept);
}

function pathnameForMarkdownLookup(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function markdownSlugForPath(pathname: string): string | null {
  const key = pathnameForMarkdownLookup(pathname);
  return PATH_TO_MARKDOWN_SLUG[key] ?? null;
}

/** Skip Auth0 session touch and other middleware side effects for machine endpoints. */
export function shouldBypassAuthMiddleware(pathname: string): boolean {
  return (
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/.well-known/")
  );
}

const LINK_HEADER_PATHS = new Set(["/", "/home", "/login"]);

export function withAgentLinkHeaders(request: NextRequest, response: NextResponse): NextResponse {
  const p = request.nextUrl.pathname;
  if (!LINK_HEADER_PATHS.has(p)) return response;
  const base = request.nextUrl.origin;
  const parts = [
    `<${base}/.well-known/api-catalog>; rel="api-catalog"`,
    `<https://docs.replay.io>; rel="service-doc"`,
    `<${base}/.well-known/openid-configuration>; rel="describedby"`,
    `<${base}/.well-known/oauth-protected-resource>; rel="oauth-protected-resource"`,
    `<${base}/.well-known/agent-skills/index.json>; rel="describedby"; title="agent-skills"`,
  ];
  response.headers.set("Link", parts.join(", "));
  return response;
}
