import type { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { bodyParser: false } }; // forward capture bytes verbatim

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.SELF_HEALING_API_KEY;
  const serviceUrl = process.env.SELF_HEALING_URL;
  if (!apiKey || !serviceUrl) {
    return res.status(503).json({ error: "Self Healing is not configured" });
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const body = Buffer.concat(chunks);

  if (body.byteLength > 256 * 1024) {
    return res.status(413).json({ error: "Capture exceeds Self Healing request limit" });
  }

  const upstream = await fetch(new URL("/api/v1/connection/sessions", serviceUrl), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body,
  });

  res.status(upstream.status).setHeader("Content-Type", "application/json");
  res.end(await upstream.text());
}
