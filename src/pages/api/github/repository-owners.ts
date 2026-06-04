import {
  fetchGithubRepositoryOwners,
  getConnectedGithubAccessToken,
  githubConnectPath,
} from "@/lib/githubConnectedAccount";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getConnectedGithubAccessToken(req, res);
  const connectUrl = githubConnectPath(returnToFromReferer(req.headers.referer));

  if (!token) {
    res.status(200).json({
      connected: false,
      connectUrl,
      owners: [],
    });
    return;
  }

  try {
    const { diagnostics, owners, warning } = await fetchGithubRepositoryOwners(token);
    res.status(200).json({
      connected: true,
      connectUrl,
      diagnostics,
      owners,
      warning,
    });
  } catch (error) {
    res.status(502).json({
      connected: false,
      connectUrl,
      error: error instanceof Error ? error.message : "Unable to load GitHub workspaces.",
      owners: [],
    });
  }
}

function returnToFromReferer(referer: string | undefined) {
  if (!referer) return "/home";

  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`;
  } catch {
    return "/home";
  }
}
