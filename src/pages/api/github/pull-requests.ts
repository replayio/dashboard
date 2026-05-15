import { getConnectedGithubAccessToken, githubConnectPath } from "@/lib/githubConnectedAccount";
import { fetchGitHubRepositoryPullRequests, GitHubApiError } from "@/lib/githubPullRequest";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const owner = getValueFromArrayOrString(req.query.owner);
  const repo = getValueFromArrayOrString(req.query.repo);

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
      pullRequestList: null,
    });
    return;
  }

  try {
    res.status(200).json({
      connected: true,
      connectUrl,
      pullRequestList: await fetchGitHubRepositoryPullRequests(owner, repo, token),
    });
  } catch (error) {
    res.status(error instanceof GitHubApiError && error.status < 500 ? error.status : 502).json({
      connected: false,
      connectUrl,
      error:
        error instanceof Error ? error.message : "Unable to load GitHub pull requests.",
      pullRequestList: null,
    });
  }
}

function returnToFromReferer(referer: string | undefined, owner: string, repo: string) {
  if (!referer) {
    return `/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls`;
  }

  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`;
  } catch {
    return `/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls`;
  }
}
