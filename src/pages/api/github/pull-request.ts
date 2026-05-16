import { getConnectedGithubAccessToken, githubConnectPath } from "@/lib/githubConnectedAccount";
import { fetchGitHubPullRequestView, GitHubApiError } from "@/lib/githubPullRequest";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const owner = getValueFromArrayOrString(req.query.owner);
  const repo = getValueFromArrayOrString(req.query.repo);
  const number = getValueFromArrayOrString(req.query.number);

  if (!owner || !repo || !number) {
    res.status(400).json({ error: "A GitHub owner, repository, and pull request are required." });
    return;
  }

  const connectUrl = githubConnectPath(returnToFromReferer(req.headers.referer, owner, repo, number));
  const token = await getConnectedGithubAccessToken(req, res);

  if (!token) {
    res.status(200).json({
      connected: false,
      connectUrl,
      pullRequest: null,
    });
    return;
  }

  try {
    res.status(200).json({
      connected: true,
      connectUrl,
      pullRequest: await fetchGitHubPullRequestView(owner, repo, number, token),
    });
  } catch (error) {
    res.status(error instanceof GitHubApiError && error.status < 500 ? error.status : 502).json({
      connected: false,
      connectUrl,
      error:
        error instanceof Error ? error.message : "Unable to load this GitHub pull request.",
      pullRequest: null,
    });
  }
}

function returnToFromReferer(
  referer: string | undefined,
  owner: string,
  repo: string,
  number: string
) {
  if (!referer) {
    return `/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(
      repo
    )}/pull/${encodeURIComponent(number)}`;
  }

  try {
    const url = new URL(referer);
    return `${url.pathname}${url.search}`;
  } catch {
    return `/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(
      repo
    )}/pull/${encodeURIComponent(number)}`;
  }
}
