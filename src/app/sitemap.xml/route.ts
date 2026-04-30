import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const paths = ["/", "/home", "/login", "/releases", "/recording"] as const;
  const now = new Date().toISOString().slice(0, 10);

  const urls = paths
    .map(p => {
      const loc = p === "/" ? origin : `${origin}${p}`;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${
      p === "/" || p === "/home" ? "1.0" : p === "/recording" ? "0.8" : "0.6"
    }</priority>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
