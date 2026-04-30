import { URLS } from "@/constants";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const anchorGraphql = `${URLS.api.replace(/\/$/, "")}/v1/graphql`;
  /** Proxied to the Replay DevTools Next app (`recordreplay-devtools`, basePath `/recording`). */
  const anchorDevtools = `${origin}/recording/`;

  const body = {
    linkset: [
      {
        anchor: anchorGraphql,
        "service-doc": [{ href: "https://docs.replay.io", type: "text/html" }],
        status: [{ href: "https://status.replay.io", type: "text/html" }],
      },
      {
        anchor: anchorDevtools,
        "service-doc": [
          { href: "https://docs.replay.io", type: "text/html" },
          { href: "https://replay.io/protocol", type: "text/html" },
          { href: "https://static.replay.io/protocol/tot/Recording/", type: "text/html" },
        ],
        status: [{ href: "https://status.replay.io", type: "text/html" }],
      },
    ],
  };

  return Response.json(body, {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
