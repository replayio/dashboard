const GITHUB_API_VERSION = process.env.GITHUB_API_VERSION?.trim() || "2022-11-28";
const GITHUB_API_TIMEOUT_MS = 12_000;
const GITHUB_MAX_ITEMS = 100;
const GITHUB_MAX_PAGES = 10;

type GitHubUser = {
  avatar_url?: string | null;
  html_url?: string | null;
  login?: string | null;
};

type GitHubRepositoryResponse = {
  default_branch?: string;
  full_name: string;
  html_url: string;
  name: string;
  owner: GitHubUser;
  private: boolean;
};

type GitHubTreeResponse = {
  sha: string;
  tree: Array<{
    mode?: string;
    path?: string;
    sha?: string;
    size?: number;
    type?: "blob" | "tree" | "commit";
    url?: string;
  }>;
  truncated: boolean;
};

type GitHubBlobResponse = {
  content: string;
  encoding: string;
  sha: string;
  size: number;
};

type GitHubPullResponse = {
  additions: number;
  base: { ref: string; sha: string };
  body?: string | null;
  changed_files: number;
  comments?: number;
  commits: number;
  created_at: string;
  deletions: number;
  draft?: boolean;
  head: { ref: string; sha: string };
  html_url: string;
  merged_at?: string | null;
  number: number;
  review_comments?: number;
  state: string;
  title: string;
  updated_at: string;
  user?: GitHubUser | null;
};

type GitHubCommitResponse = {
  commit?: {
    author?: {
      date?: string | null;
      name?: string | null;
    } | null;
    message?: string | null;
  } | null;
  html_url?: string;
  sha: string;
};

type GitHubFileResponse = {
  additions: number;
  changes: number;
  deletions: number;
  filename: string;
  patch?: string;
  status: string;
};

type GitHubCheckRunResponse = {
  conclusion?: string | null;
  html_url?: string | null;
  name?: string | null;
  status?: string | null;
};

type GitHubCommentResponse = {
  body?: string | null;
  created_at?: string | null;
  html_url?: string | null;
  id: number;
  user?: GitHubUser | null;
};

type GitHubReviewResponse = {
  body?: string | null;
  html_url?: string | null;
  id: number;
  state?: string | null;
  submitted_at?: string | null;
  user?: GitHubUser | null;
};

export type GitHubActor = {
  avatarUrl?: string | null;
  htmlUrl?: string | null;
  login: string;
};

export type GitHubPullRequestView = {
  checks: {
    failed: number;
    pending: number;
    runs: Array<{
      conclusion?: string | null;
      htmlUrl?: string | null;
      name: string;
      status?: string | null;
    }>;
    state: "failure" | "pending" | "success" | "unknown";
    total: number;
  };
  comments: Array<{
    author: GitHubActor;
    body: string;
    createdAt?: string | null;
    htmlUrl?: string | null;
    id: number;
    kind: "comment" | "review";
    state?: string | null;
  }>;
  commits: Array<{
    authorName?: string | null;
    committedAt?: string | null;
    htmlUrl?: string;
    message: string;
    sha: string;
  }>;
  files: Array<{
    additions: number;
    changes: number;
    deletions: number;
    filename: string;
    patch?: string;
    status: string;
  }>;
  installUrl: string | null;
  pullRequest: {
    additions: number;
    author: GitHubActor;
    baseRef: string;
    body?: string | null;
    changedFiles: number;
    commitCount: number;
    createdAt: string;
    deletions: number;
    draft: boolean;
    headRef: string;
    headSha: string;
    htmlUrl: string;
    mergedAt?: string | null;
    number: number;
    state: string;
    title: string;
    updatedAt: string;
  };
  repository: {
    defaultBranch?: string;
    fullName: string;
    htmlUrl: string;
    name: string;
    owner: string;
    private: boolean;
  };
};

export type GitHubRepositoryPullRequestList = {
  pullRequests: Array<{
    author: GitHubActor;
    baseRef: string;
    commentCount: number;
    createdAt: string;
    draft: boolean;
    headRef: string;
    htmlUrl: string;
    mergedAt?: string | null;
    number: number;
    state: string;
    title: string;
    updatedAt: string;
  }>;
  repository: {
    defaultBranch?: string;
    fullName: string;
    htmlUrl: string;
    name: string;
    owner: string;
    private: boolean;
  };
};

export type GitHubRepositoryTreeView = {
  repository: {
    defaultBranch?: string;
    fullName: string;
    htmlUrl: string;
    name: string;
    owner: string;
    private: boolean;
  };
  selectedFile: {
    content: string;
    encoding: "base64" | "utf-8";
    isBinary: boolean;
    path: string;
    sha: string;
    size: number;
  } | null;
  tree: Array<{
    path: string;
    sha: string;
    size?: number;
    type: "blob" | "tree";
  }>;
  truncated: boolean;
};

export class GitHubApiError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
  }
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };
}

function githubAppInstallUrl() {
  const configured =
    process.env.NEXT_PUBLIC_GITHUB_APP_INSTALL_URL ?? process.env.GITHUB_APP_INSTALL_URL;
  if (configured) return configured;

  const slug = process.env.NEXT_PUBLIC_GITHUB_APP_SLUG ?? process.env.GITHUB_APP_SLUG;
  if (!slug) return null;

  return `https://github.com/apps/${slug}/installations/new`;
}

async function githubFetch(input: URL | string, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GITHUB_API_TIMEOUT_MS);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function githubJson<T>(url: string, token: string, message = "GitHub API request failed.") {
  const response = await githubFetch(url, {
    cache: "no-store",
    headers: githubHeaders(token),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new GitHubApiError(response.status, body || message);
  }

  return (await response.json()) as T;
}

function actor(user: GitHubUser | null | undefined): GitHubActor {
  return {
    avatarUrl: user?.avatar_url ?? null,
    htmlUrl: user?.html_url ?? null,
    login: user?.login ?? "unknown",
  };
}

function checkState(checkRuns: GitHubCheckRunResponse[]) {
  const total = checkRuns.length;
  const failed = checkRuns.filter(run =>
    ["action_required", "cancelled", "failure", "timed_out"].includes(run.conclusion ?? "")
  ).length;
  const pending = checkRuns.filter(run => run.status !== "completed").length;

  return {
    failed,
    pending,
    state: total === 0 ? "unknown" : failed > 0 ? "failure" : pending > 0 ? "pending" : "success",
    total,
  } as const;
}

function firstLine(message: string | null | undefined) {
  return message?.split("\n")[0]?.trim() || "Commit";
}

function repositorySummary(repository: GitHubRepositoryResponse, fallbackOwner: string) {
  return {
    defaultBranch: repository.default_branch,
    fullName: repository.full_name,
    htmlUrl: repository.html_url,
    name: repository.name,
    owner: repository.owner.login ?? fallbackOwner,
    private: repository.private,
  };
}

async function optionalGithubJson<T>(url: string, token: string, fallback: T) {
  try {
    return await githubJson<T>(url, token);
  } catch {
    return fallback;
  }
}

const PREVIEWABLE_FILE_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mjs",
  ".rs",
  ".scss",
  ".sh",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml",
]);

const PREVIEWABLE_FILE_NAMES = new Set([
  ".env.example",
  ".gitignore",
  "Dockerfile",
  "LICENSE",
  "Makefile",
  "README",
  "README.md",
]);

function extension(path: string) {
  const name = path.split("/").at(-1) ?? path;
  const index = name.lastIndexOf(".");
  return index === -1 ? "" : name.slice(index);
}

function isPreviewablePath(path: string) {
  const name = path.split("/").at(-1) ?? path;
  return PREVIEWABLE_FILE_NAMES.has(name) || PREVIEWABLE_FILE_EXTENSIONS.has(extension(path));
}

function compareTreeEntries(
  left: { path: string; type: "blob" | "tree" },
  right: { path: string; type: "blob" | "tree" }
) {
  const leftParts = left.path.split("/");
  const rightParts = right.path.split("/");

  for (let index = 0; index < Math.max(leftParts.length, rightParts.length); index += 1) {
    const leftPart = leftParts[index];
    const rightPart = rightParts[index];
    if (leftPart == null) return -1;
    if (rightPart == null) return 1;
    if (leftPart === rightPart) continue;
    return leftPart.localeCompare(rightPart);
  }

  if (left.type === right.type) return left.path.localeCompare(right.path);
  return left.type === "tree" ? -1 : 1;
}

function chooseFilePath(
  tree: GitHubRepositoryTreeView["tree"],
  requestedPath: string | null | undefined
) {
  const files = tree.filter(entry => entry.type === "blob");
  if (requestedPath && files.some(entry => entry.path === requestedPath)) {
    return requestedPath;
  }

  return (
    files.find(entry => entry.path.toLowerCase() === "readme.md")?.path ??
    files.find(entry => entry.path.toLowerCase().endsWith("/readme.md"))?.path ??
    files.find(entry => isPreviewablePath(entry.path))?.path ??
    files[0]?.path ??
    null
  );
}

function decodeBlobContent(blob: GitHubBlobResponse) {
  if (blob.encoding !== "base64") {
    return {
      content: blob.content,
      encoding: "utf-8" as const,
      isBinary: false,
    };
  }

  const content = Buffer.from(blob.content.replaceAll("\n", ""), "base64").toString("utf8");

  return {
    content,
    encoding: "base64" as const,
    isBinary: content.includes("\u0000"),
  };
}

export async function fetchGitHubRepositoryTreeView(
  owner: string,
  repo: string,
  token: string,
  requestedPath?: string | null
): Promise<GitHubRepositoryTreeView> {
  const baseUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
    repo
  )}`;
  const repository = await githubJson<GitHubRepositoryResponse>(
    baseUrl,
    token,
    "Unable to read GitHub repository."
  );
  const branch = repository.default_branch ?? "main";
  const treeResponse = await githubJson<GitHubTreeResponse>(
    `${baseUrl}/git/trees/${encodeURIComponent(branch)}?recursive=1`,
    token,
    "Unable to read GitHub repository tree."
  );
  const tree = treeResponse.tree
    .flatMap(entry => {
      if (!entry.path || !entry.sha) return [];
      if (entry.type !== "blob" && entry.type !== "tree") return [];

      return [
        {
          path: entry.path,
          sha: entry.sha,
          size: entry.size,
          type: entry.type,
        },
      ];
    })
    .sort(compareTreeEntries);
  const selectedPath = chooseFilePath(tree, requestedPath);
  const selectedTreeEntry = selectedPath
    ? tree.find(entry => entry.type === "blob" && entry.path === selectedPath)
    : null;
  const selectedFile = selectedTreeEntry
    ? await githubJson<GitHubBlobResponse>(
        `${baseUrl}/git/blobs/${encodeURIComponent(selectedTreeEntry.sha)}`,
        token,
        "Unable to read GitHub file."
      ).then(blob => {
        const decoded = decodeBlobContent(blob);

        return {
          content: decoded.isBinary ? "Binary file preview is not available." : decoded.content,
          encoding: decoded.encoding,
          isBinary: decoded.isBinary,
          path: selectedTreeEntry.path,
          sha: blob.sha,
          size: blob.size,
        };
      })
    : null;

  return {
    repository: repositorySummary(repository, owner),
    selectedFile,
    tree,
    truncated: treeResponse.truncated,
  };
}

export async function fetchGitHubRepositoryPullRequests(
  owner: string,
  repo: string,
  token: string
): Promise<GitHubRepositoryPullRequestList> {
  const baseUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
    repo
  )}`;
  const repository = await githubJson<GitHubRepositoryResponse>(
    baseUrl,
    token,
    "Unable to read GitHub repository."
  );
  const pullRequests: GitHubPullResponse[] = [];

  for (let page = 1; page <= GITHUB_MAX_PAGES; page += 1) {
    const url = new URL(`${baseUrl}/pulls`);
    url.searchParams.set("state", "all");
    url.searchParams.set("sort", "updated");
    url.searchParams.set("direction", "desc");
    url.searchParams.set("per_page", String(GITHUB_MAX_ITEMS));
    url.searchParams.set("page", String(page));

    const pagePullRequests = await githubJson<GitHubPullResponse[]>(
      url.toString(),
      token,
      "Unable to read GitHub pull requests."
    );
    pullRequests.push(...pagePullRequests);

    if (pagePullRequests.length === 0) break;
  }

  return {
    pullRequests: pullRequests.map(pullRequest => ({
      author: actor(pullRequest.user),
      baseRef: pullRequest.base.ref,
      commentCount: (pullRequest.comments ?? 0) + (pullRequest.review_comments ?? 0),
      createdAt: pullRequest.created_at,
      draft: pullRequest.draft === true,
      headRef: pullRequest.head.ref,
      htmlUrl: pullRequest.html_url,
      mergedAt: pullRequest.merged_at,
      number: pullRequest.number,
      state: pullRequest.state,
      title: pullRequest.title,
      updatedAt: pullRequest.updated_at,
    })),
    repository: repositorySummary(repository, owner),
  };
}

export async function fetchGitHubPullRequestView(
  owner: string,
  repo: string,
  number: string | number,
  token: string
): Promise<GitHubPullRequestView> {
  const baseUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(
    repo
  )}`;
  const pullNumber = encodeURIComponent(String(number));

  const [repository, pullRequest] = await Promise.all([
    githubJson<GitHubRepositoryResponse>(baseUrl, token, "Unable to read GitHub repository."),
    githubJson<GitHubPullResponse>(
      `${baseUrl}/pulls/${pullNumber}`,
      token,
      "Unable to read GitHub pull request."
    ),
  ]);

  const [commits, files, checkPayload, issueComments, reviews] = await Promise.all([
    optionalGithubJson<GitHubCommitResponse[]>(
      `${baseUrl}/pulls/${pullNumber}/commits?per_page=${GITHUB_MAX_ITEMS}`,
      token,
      []
    ),
    optionalGithubJson<GitHubFileResponse[]>(
      `${baseUrl}/pulls/${pullNumber}/files?per_page=${GITHUB_MAX_ITEMS}`,
      token,
      []
    ),
    optionalGithubJson<{ check_runs?: GitHubCheckRunResponse[] }>(
      `${baseUrl}/commits/${encodeURIComponent(pullRequest.head.sha)}/check-runs?per_page=${GITHUB_MAX_ITEMS}`,
      token,
      {}
    ),
    optionalGithubJson<GitHubCommentResponse[]>(
      `${baseUrl}/issues/${pullNumber}/comments?per_page=${GITHUB_MAX_ITEMS}`,
      token,
      []
    ),
    optionalGithubJson<GitHubReviewResponse[]>(
      `${baseUrl}/pulls/${pullNumber}/reviews?per_page=${GITHUB_MAX_ITEMS}`,
      token,
      []
    ),
  ]);

  const checkRuns = Array.isArray(checkPayload.check_runs) ? checkPayload.check_runs : [];
  const summary = checkState(checkRuns);

  return {
    checks: {
      ...summary,
      runs: checkRuns.map(run => ({
        conclusion: run.conclusion,
        htmlUrl: run.html_url,
        name: run.name ?? "Check",
        status: run.status,
      })),
    },
    comments: [
      ...issueComments.map(comment => ({
        author: actor(comment.user),
        body: comment.body ?? "",
        createdAt: comment.created_at,
        htmlUrl: comment.html_url,
        id: comment.id,
        kind: "comment" as const,
      })),
      ...reviews.map(review => ({
        author: actor(review.user),
        body: review.body ?? "",
        createdAt: review.submitted_at,
        htmlUrl: review.html_url,
        id: review.id,
        kind: "review" as const,
        state: review.state,
      })),
    ].sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return aTime - bTime;
    }),
    commits: commits.map(commit => ({
      authorName: commit.commit?.author?.name,
      committedAt: commit.commit?.author?.date,
      htmlUrl: commit.html_url,
      message: firstLine(commit.commit?.message),
      sha: commit.sha,
    })),
    files: files.map(file => ({
      additions: file.additions,
      changes: file.changes,
      deletions: file.deletions,
      filename: file.filename,
      patch: file.patch,
      status: file.status,
    })),
    installUrl: githubAppInstallUrl(),
    pullRequest: {
      additions: pullRequest.additions,
      author: actor(pullRequest.user),
      baseRef: pullRequest.base.ref,
      body: pullRequest.body,
      changedFiles: pullRequest.changed_files,
      commitCount: pullRequest.commits,
      createdAt: pullRequest.created_at,
      deletions: pullRequest.deletions,
      draft: pullRequest.draft === true,
      headRef: pullRequest.head.ref,
      headSha: pullRequest.head.sha,
      htmlUrl: pullRequest.html_url,
      mergedAt: pullRequest.merged_at,
      number: pullRequest.number,
      state: pullRequest.state,
      title: pullRequest.title,
      updatedAt: pullRequest.updated_at,
    },
    repository: repositorySummary(repository, owner),
  };
}
