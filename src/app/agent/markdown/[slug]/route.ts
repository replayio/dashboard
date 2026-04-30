import { readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED = new Set(["home", "login", "releases", "recording"]);

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: { slug: string } }) {
  const slug = context.params.slug;
  if (!ALLOWED.has(slug)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const filePath = path.join(process.cwd(), "public", "agent", `${slug}.md`);
  try {
    const text = await readFile(filePath, "utf8");
    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
