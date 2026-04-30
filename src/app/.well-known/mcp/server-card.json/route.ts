import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  let version = "0.1.0";
  try {
    const raw = await readFile(path.join(process.cwd(), "package.json"), "utf8");
    const pkg = JSON.parse(raw) as { version?: string };
    if (pkg.version) version = pkg.version;
  } catch {
    // keep default
  }

  const origin = new URL(request.url).origin;

  const body = {
    serverInfo: {
      name: "Replay Dashboard",
      version,
    description:
      "Web dashboard for Replay.io (recordings, tests, teams). The recording debugger UI is served under /recording/ (Replay DevTools). There is no hosted MCP server endpoint here; tools may be exposed in-browser via WebMCP where supported.",
    },
    capabilities: {
      tools: false,
      resources: false,
      prompts: false,
    },
    _meta: {
      dashboard_url: origin,
      recording_devtools_path: "/recording/",
      documentation: "https://docs.replay.io",
      protocol_docs: "https://replay.io/protocol",
    },
  };

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
