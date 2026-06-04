import { forwardCodespriteRequest } from "@/lib/codespriteProxy";
import { getConnectedGithubAccessToken } from "@/lib/githubConnectedAccount";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const token = await getConnectedGithubAccessToken(req, res);
  if (!token) {
    res.status(401).json({ error: "Connect GitHub before editing codesprite files." });
    return;
  }

  try {
    const result = await forwardCodespriteRequest("/editor-fs", token, req.body);
    res.status(result.status).json(result.payload);
  } catch (error) {
    res.status(502).json({
      error: error instanceof Error ? error.message : "Unable to access codesprite files.",
    });
  }
}
