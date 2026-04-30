import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function robotsBody(origin: string): string {
  const sitemap = `${origin}/sitemap.xml`;
  const commonDisallows = [
    "Disallow: /api/",
    "Disallow: /browser/",
    "Disallow: /team/",
    "Disallow: /user/",
    "Disallow: /org/",
    "Disallow: /intake/",
    "Disallow: /_next/",
  ].join("\n");

  const block = [
    "User-agent: *",
    ...commonDisallows.split("\n"),
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    "User-agent: GPTBot",
    ...commonDisallows.split("\n"),
    "",
    "User-agent: OAI-SearchBot",
    ...commonDisallows.split("\n"),
    "",
    "User-agent: Claude-Web",
    ...commonDisallows.split("\n"),
    "",
    "User-agent: Google-Extended",
    ...commonDisallows.split("\n"),
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");

  return block;
}

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  return new Response(robotsBody(origin), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
