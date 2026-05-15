import { ExternalLink } from "@/components/ExternalLink";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useGithubApi } from "@/hooks/useGithubApi";
import type { GitHubPullRequestView } from "@/lib/githubPullRequest";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const GitHubPullRequestDiff = dynamic(
  () =>
    import("@/pageComponents/github/GitHubPullRequestDiff").then(
      module => module.GitHubPullRequestDiff
    ),
  {
    loading: () => <PullRequestDiffLoading />,
    ssr: false,
  }
);

type PageError = {
  connectUrl?: string | null;
  installUrl: string | null;
  message: string;
  status: "config" | "connect" | "not-installed" | "unavailable";
};

type PullRequestResponse = {
  connected: boolean;
  connectUrl: string;
  error?: string;
  pullRequest: GitHubPullRequestView | null;
};

type PageProps = {
  number: string;
  owner: string;
  repo: string;
};

export default function GitHubPullRequestPage({
  number,
  owner,
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const activeTab = router.query.tab === "changes" ? "changes" : "overview";
  const pullRequestUrl = `/api/github/pull-request?owner=${encodeURIComponent(
    owner
  )}&repo=${encodeURIComponent(repo)}&number=${encodeURIComponent(number)}`;
  const { data, error, isLoading } = useGithubApi<PullRequestResponse>(pullRequestUrl);

  if (isLoading || !data) {
    return <GitHubPullRequestLoading number={number} owner={owner} repo={repo} />;
  }

  if (error || data.error) {
    return (
      <GitHubPrError
        error={{
          connectUrl: null,
          installUrl: null,
          message: error ?? data.error ?? "Replay could not load this GitHub pull request.",
          status: "unavailable",
        }}
      />
    );
  }

  if (!data.connected) {
    return (
      <GitHubPrError
        error={{
          connectUrl: data.connectUrl,
          installUrl: null,
          message: "Connect GitHub so Replay can verify that you can access this pull request.",
          status: "connect",
        }}
      />
    );
  }

  if (!data.pullRequest) {
    return <GitHubPullRequestLoading number={number} owner={owner} repo={repo} />;
  }

  const pullRequest = data.pullRequest;

  return (
    <>
      <Head>
        <title>{`${pullRequest.repository.fullName}#${pullRequest.pullRequest.number} · Replay`}</title>
      </Head>
      <main className="min-h-full bg-background">
        <div className="grid min-h-full grid-cols-[280px_minmax(0,1fr)_340px]">
          <aside className="border-r border-border bg-card/60 p-5">
            <RepositoryPanel pullRequest={pullRequest} />
          </aside>
          <section className="min-w-0 p-6">
            <PullRequestMain activeTab={activeTab} pullRequest={pullRequest} />
          </section>
          <aside className="border-l border-border bg-card/60 p-5">
            <ActivityPanel pullRequest={pullRequest} />
          </aside>
        </div>
      </main>
    </>
  );
}

GitHubPullRequestPage.Layout = DefaultLayout;

function GitHubPullRequestLoading({
  number,
  owner,
  repo,
}: {
  number: string;
  owner: string;
  repo: string;
}) {
  return (
    <>
      <Head>
        <title>{`${owner}/${repo}#${number} · Replay`}</title>
      </Head>
      <main className="min-h-full bg-background">
        <div className="grid min-h-full grid-cols-[280px_minmax(0,1fr)_340px]">
          <aside className="border-r border-border bg-card/60 p-5">
            <div className="flex flex-col gap-5">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  GitHub
                </div>
                <h1 className="mt-2 break-words text-xl font-semibold leading-tight text-foreground">
                  {owner}/{repo}
                </h1>
                <Skeleton className="mt-3 h-4 w-32" />
              </div>
              <div className="rounded-lg border border-border bg-background p-3">
                <Skeleton className="h-3 w-24" />
                <div className="mt-3 text-2xl font-semibold">#{number}</div>
                <Skeleton className="mt-3 h-4 w-16" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="rounded-lg border border-border bg-background p-3" key={index}>
                    <Skeleton className="h-6 w-10" />
                    <Skeleton className="mt-2 h-3 w-14" />
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-border bg-background p-3">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="mt-3 h-4 w-24" />
                <Skeleton className="mt-2 h-3 w-32" />
              </div>
            </div>
          </aside>
          <section className="min-w-0 p-6">
            <div className="mx-auto flex max-w-5xl flex-col gap-6">
              <header className="border-b border-border pb-5">
                <Skeleton className="mb-4 h-4 w-64" />
                <Skeleton className="h-9 w-4/5" />
                <div className="mt-4 flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </header>
              <SectionSkeleton rows={4} titleWidth="w-28" />
              <SectionSkeleton rows={5} titleWidth="w-20" />
              <SectionSkeleton rows={6} titleWidth="w-28" />
            </div>
          </section>
          <aside className="border-l border-border bg-card/60 p-5">
            <div className="flex flex-col gap-5">
              <SidePanelSkeleton title="Checks" rows={4} />
              <SidePanelSkeleton title="Conversation" rows={5} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

function SectionSkeleton({ rows, titleWidth }: { rows: number; titleWidth: string }) {
  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <Skeleton className={`h-5 ${titleWidth}`} />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, index) => (
          <div className="px-4 py-3" key={index}>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}

function SidePanelSkeleton({ rows, title }: { rows: number; title: string }) {
  return (
    <section>
      <h3 className="my-0 mb-3 text-base font-semibold">{title}</h3>
      <div className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, index) => (
          <div className="rounded-lg border border-border bg-background p-3" key={index}>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-2 h-3 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}

function PullRequestDiffLoading() {
  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-3 p-4">
        {Array.from({ length: 14 }).map((_, index) => (
          <div className="flex items-center gap-3" key={index}>
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4" style={{ width: `${45 + (index % 6) * 7}%` }} />
          </div>
        ))}
      </div>
    </section>
  );
}

function RepositoryPanel({ pullRequest }: { pullRequest: GitHubPullRequestView }) {
  const { repository, pullRequest: pr } = pullRequest;
  const checkLabel =
    pullRequest.checks.state === "success"
      ? "Passing"
      : pullRequest.checks.state === "failure"
        ? "Failing"
        : pullRequest.checks.state === "pending"
          ? "Running"
          : "No checks";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          GitHub
        </div>
        <h1 className="mt-2 break-words text-xl font-semibold leading-tight text-foreground">
          {repository.fullName}
        </h1>
        <div className="mt-2 text-sm text-muted-foreground">
          {repository.private ? "Private repository" : "Public repository"}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background p-3">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Pull Request
        </div>
        <div className="mt-2 text-2xl font-semibold">#{pr.number}</div>
        <div className="mt-1 text-sm capitalize text-muted-foreground">
          {pr.draft ? "draft" : pr.state}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <Metric label="Files" value={String(pr.changedFiles)} />
        <Metric label="Commits" value={String(pr.commitCount)} />
        <Metric className="text-emerald-600" label="Added" value={`+${pr.additions}`} />
        <Metric className="text-red-600" label="Deleted" value={`-${pr.deletions}`} />
      </div>

      <div className="rounded-lg border border-border bg-background p-3">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Checks
        </div>
        <div className="mt-2 font-medium">{checkLabel}</div>
        <div className="mt-1 text-sm text-muted-foreground">
          {pullRequest.checks.total} checks · {pullRequest.checks.failed} failed ·{" "}
          {pullRequest.checks.pending} pending
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <ExternalLink
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground no-underline hover:bg-primary/90"
          href={pr.htmlUrl}
        >
          Open in GitHub
        </ExternalLink>
        {pullRequest.installUrl ? (
          <ExternalLink
            className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground no-underline hover:bg-muted"
            href={pullRequest.installUrl}
          >
            Update app access
          </ExternalLink>
        ) : null}
      </div>
    </div>
  );
}

function PullRequestMain({
  activeTab,
  pullRequest,
}: {
  activeTab: "changes" | "overview";
  pullRequest: GitHubPullRequestView;
}) {
  const { pullRequest: pr } = pullRequest;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header className="border-b border-border pb-5">
        <PullRequestBreadcrumb pullRequest={pullRequest} />
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <span>{pr.baseRef}</span>
          <span>←</span>
          <span>{pr.headRef}</span>
          <span>·</span>
          <span>{shortSha(pr.headSha)}</span>
        </div>
        <h2 className="my-0 mt-4 text-3xl font-semibold leading-tight">{pr.title}</h2>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Avatar actor={pr.author} />
          <span>{pr.author.login}</span>
          <span>opened {formatDate(pr.createdAt)}</span>
        </div>
        <div className="mt-5">
          <PullRequestTabs activeTab={activeTab} pullRequest={pullRequest} />
        </div>
      </header>

      {activeTab === "changes" ? (
        <GitHubPullRequestDiff pullRequest={pullRequest} />
      ) : (
        <>
          {pr.body ? (
            <section className="rounded-lg border border-border bg-card p-4">
              <h3 className="my-0 mb-3 text-base font-semibold">Description</h3>
              <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">{pr.body}</p>
            </section>
          ) : null}

          <section className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="my-0 text-base font-semibold">Stack</h3>
              <span className="text-sm text-muted-foreground">
                {pullRequest.commits.length} commits
              </span>
            </div>
            <div className="divide-y divide-border">
              {pullRequest.commits.map(commit => (
                <div className="flex items-start gap-3 px-4 py-3" key={commit.sha}>
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{commit.message}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {commit.authorName ?? "unknown"} · {formatDate(commit.committedAt)} ·{" "}
                      {shortSha(commit.sha)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="my-0 text-base font-semibold">Files changed</h3>
              <span className="text-sm text-muted-foreground">{pullRequest.files.length} files</span>
            </div>
            <div className="divide-y divide-border">
              {pullRequest.files.map(file => (
                <div className="px-4 py-3" key={file.filename}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 truncate font-mono text-sm">{file.filename}</div>
                    <div className="flex shrink-0 items-center gap-3 text-xs">
                      <span className="text-emerald-600">+{file.additions}</span>
                      <span className="text-red-600">-{file.deletions}</span>
                      <span className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
                        {file.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function PullRequestBreadcrumb({ pullRequest }: { pullRequest: GitHubPullRequestView }) {
  const { pullRequest: pr, repository } = pullRequest;
  const ownerHref = `/github.com/${encodeURIComponent(repository.owner)}`;
  const repoHref = `${ownerHref}/${encodeURIComponent(repository.name)}`;
  const pullsHref = `${repoHref}/pulls`;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
    >
      <span className="font-medium text-muted-foreground">github.com</span>
      <BreadcrumbSeparator />
      <Link
        className="max-w-40 truncate text-muted-foreground no-underline hover:text-foreground hover:underline"
        href={ownerHref}
      >
        {repository.owner}
      </Link>
      <BreadcrumbSeparator />
      <Link
        className="max-w-56 truncate text-muted-foreground no-underline hover:text-foreground hover:underline"
        href={repoHref}
      >
        {repository.name}
      </Link>
      <BreadcrumbSeparator />
      <Link
        className="text-muted-foreground no-underline hover:text-foreground hover:underline"
        href={pullsHref}
      >
        Pull requests
      </Link>
      <BreadcrumbSeparator />
      <span className="font-medium text-foreground">#{pr.number}</span>
    </nav>
  );
}

function BreadcrumbSeparator() {
  return <span className="text-muted-foreground/60">/</span>;
}

function PullRequestTabs({
  activeTab,
  pullRequest,
}: {
  activeTab: "changes" | "overview";
  pullRequest: GitHubPullRequestView;
}) {
  const { pullRequest: pr, repository } = pullRequest;
  const basePath = `/github.com/${encodeURIComponent(repository.owner)}/${encodeURIComponent(
    repository.name
  )}/pull/${pr.number}`;

  return (
    <nav className="inline-flex items-center gap-1 rounded-md border border-border bg-card p-1 text-sm">
      <Link
        className={`inline-flex h-8 items-center rounded px-3 font-medium no-underline ${
          activeTab === "overview"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        href={basePath}
      >
        Overview
      </Link>
      <Link
        className={`inline-flex h-8 items-center rounded px-3 font-medium no-underline ${
          activeTab === "changes"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        href={`${basePath}?tab=changes`}
      >
        Changes
      </Link>
    </nav>
  );
}

function ActivityPanel({ pullRequest }: { pullRequest: GitHubPullRequestView }) {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h3 className="my-0 mb-3 text-base font-semibold">Checks</h3>
        <div className="flex flex-col gap-2">
          {pullRequest.checks.runs.length ? (
            pullRequest.checks.runs.map(run => (
              <div
                className="rounded-lg border border-border bg-background p-3 text-sm"
                key={`${run.name}-${run.htmlUrl}`}
              >
                <div className="font-medium">{run.name}</div>
                <div className="mt-1 capitalize text-muted-foreground">
                  {run.conclusion ?? run.status ?? "unknown"}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-border bg-background p-3 text-sm text-muted-foreground">
              No checks reported for this head commit.
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="my-0 mb-3 text-base font-semibold">Conversation</h3>
        <div className="flex flex-col gap-3">
          {pullRequest.comments.length ? (
            pullRequest.comments.map(item => (
              <div className="rounded-lg border border-border bg-background p-3" key={item.id}>
                <div className="flex items-center gap-2 text-sm">
                  <Avatar actor={item.author} />
                  <span className="font-medium">{item.author.login}</span>
                  {item.state ? (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs uppercase text-muted-foreground">
                      {item.state}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 line-clamp-6 whitespace-pre-wrap text-sm leading-5 text-muted-foreground">
                  {item.body || "No comment body."}
                </p>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-border bg-background p-3 text-sm text-muted-foreground">
              No comments or reviews yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function GitHubPrError({ error }: { error: PageError }) {
  return (
    <>
      <Head>
        <title>{`GitHub PR · Replay`}</title>
      </Head>
      <main className="flex min-h-full items-center justify-center bg-background p-8">
        <section className="w-full max-w-lg rounded-lg border border-border bg-card p-6 text-center shadow-sm">
          <h1 className="my-0 text-2xl font-semibold">GitHub PR unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{error.message}</p>
          {error.connectUrl ? (
            <a
              className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary/90"
              href={error.connectUrl}
            >
              Connect GitHub
            </a>
          ) : null}
          {error.installUrl ? (
            <ExternalLink
              className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary/90"
              href={error.installUrl}
            >
              Install GitHub App
            </ExternalLink>
          ) : null}
        </section>
      </main>
    </>
  );
}

function Metric({
  className = "",
  label,
  value,
}: {
  className?: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <div className={`text-lg font-semibold ${className}`}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Avatar({ actor }: { actor: { avatarUrl?: string | null; login: string } }) {
  if (!actor.avatarUrl) {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium uppercase">
        {actor.login[0] ?? "?"}
      </span>
    );
  }

  return <img alt="" className="h-5 w-5 rounded-full" src={actor.avatarUrl} />;
}

function shortSha(sha: string) {
  return sha.slice(0, 7);
}

function formatDate(value?: string | null) {
  if (!value) return "unknown";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const owner = getValueFromArrayOrString(context.params?.owner);
  const repo = getValueFromArrayOrString(context.params?.repo);
  const number = getValueFromArrayOrString(context.params?.number);

  if (!owner || !repo || !number) {
    return { notFound: true };
  }

  return {
    props: {
      number,
      owner,
      repo,
    } satisfies PageProps,
  };
}
