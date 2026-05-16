import {
  fetchGithubRepositoriesForOwner,
  getConnectedGithubAccessToken,
  githubConnectPath,
} from "@/lib/githubConnectedAccount";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const owner = getValueFromArrayOrString(req.query.owner);

  if (!owner) {
    res.status(400).json({ error: "A GitHub owner is required." });
    return;
  }

  const connectUrl = githubConnectPath(returnToFromReferer(req.headers.referer, owner));
  const token = await getConnectedGithubAccessToken(req, res);

  if (!token) {
    res.status(200).json({
      connected: false,
      connectUrl,
      repositories: [],
    });
    return;
  }

  try {
    res.status(200).json({
      connected: true,
      connectUrl,
      repositories: await fetchGithubRepositoriesForOwner(token, owner),
    });
  } catch (error) {
    res.status(502).json({
      connected: false,
      connectUrl,
      error: error instanceof Error ? error.message : "Unable to load GitHub repositories.",
      repositories: [],
    });
  }
}

function returnToFromReferer(referer: string | undefined, owner: string) {
  if (!referer) return `/github.com/${encodeURIComponent(owner)}`;

  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`;
  } catch {
    return `/github.com/${encodeURIComponent(owner)}`;
  }
}
