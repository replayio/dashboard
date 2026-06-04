import { getConnectedGithubAccessToken, githubConnectPath } from "@/lib/githubConnectedAccount";
import { fetchGitHubRepositoryTreeView, GitHubApiError } from "@/lib/githubPullRequest";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const owner = getValueFromArrayOrString(req.query.owner);
  const repo = getValueFromArrayOrString(req.query.repo);
  const path = getValueFromArrayOrString(req.query.path);

  if (!owner || !repo) {
    res.status(400).json({ error: "A GitHub owner and repository are required." });
    return;
  }

  const connectUrl = githubConnectPath(returnToFromReferer(req.headers.referer, owner, repo));
  const token = await getConnectedGithubAccessToken(req, res);

  if (!token) {
    res.status(200).json({
      connected: false,
      connectUrl,
      repositoryTree: null,
    });
    return;
  }

  try {
    res.status(200).json({
      connected: true,
      connectUrl,
      repositoryTree: await fetchGitHubRepositoryTreeView(owner, repo, token, path),
    });
  } catch (error) {
    res.status(error instanceof GitHubApiError && error.status < 500 ? error.status : 502).json({
      connected: false,
      connectUrl,
      error: error instanceof Error ? error.message : "Unable to load this GitHub repository.",
      repositoryTree: null,
    });
  }
}

function returnToFromReferer(referer: string | undefined, owner: string, repo: string) {
  if (!referer) {
    return `/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  }

  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`;
  } catch {
    return `/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  }
}
