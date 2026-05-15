import { ExternalLink } from "@/components/ExternalLink";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useGithubApi } from "@/hooks/useGithubApi";
import type { GitHubRepositoryPullRequestList } from "@/lib/githubPullRequest";
import { GitHubRepositoryTabs } from "@/pageComponents/github/GitHubRepositoryTabs";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

type PullRequestsResponse = {
  connected: boolean;
  connectUrl: string;
  error?: string;
  pullRequestList: GitHubRepositoryPullRequestList | null;
};

type PageProps = {
  owner: string;
  repo: string;
};

export default function GitHubRepositoryPullsPage({
  owner,
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const pullRequestsUrl = `/api/github/pull-requests?owner=${encodeURIComponent(
    owner
  )}&repo=${encodeURIComponent(repo)}`;
  const { data, error, isLoading } = useGithubApi<PullRequestsResponse>(pullRequestsUrl);

  if (isLoading) {
    return <GitHubRepositoryPullsLoading owner={owner} repo={repo} />;
  }

  if (error || data?.error) {
    return (
      <GitHubRepositoryPullsError
        message={error ?? data?.error ?? "Unable to load GitHub pull requests."}
        owner={owner}
        repo={repo}
      />
    );
  }

  if (data && !data.connected) {
    return (
      <GitHubRepositoryPullsError
        connectUrl={data.connectUrl}
        message="Connect GitHub so Replay can load pull requests for this repository."
        owner={owner}
        repo={repo}
      />
    );
  }

  if (!data?.pullRequestList) {
    return <GitHubRepositoryPullsLoading owner={owner} repo={repo} />;
  }

  const { pullRequests, repository } = data.pullRequestList;

  return (
    <>
      <Head>
        <title>{`${repository.fullName} pull requests · Replay`}</title>
      </Head>
      <main className="min-h-full bg-[#0a0a0a] p-6 text-zinc-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-medium text-zinc-500">GitHub</div>
              <div className="mt-1 flex min-w-0 items-center gap-2 text-sm text-zinc-500">
                <Link
                  className="truncate text-zinc-400 no-underline hover:text-zinc-100 hover:underline"
                  href={`/github.com/${encodeURIComponent(owner)}`}
                >
                  {owner}
                </Link>
                <span>/</span>
                <Link
                  className="truncate text-zinc-400 no-underline hover:text-zinc-100 hover:underline"
                  href={`/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`}
                >
                  {repository.name}
                </Link>
              </div>
              <h1 className="my-0 mt-2 truncate text-3xl font-semibold tracking-normal">
                Pull requests
              </h1>
              <div className="mt-2 text-sm text-zinc-500">
                {repository.private ? "Private" : "Public"}
                {repository.defaultBranch ? ` · ${repository.defaultBranch}` : ""}
              </div>
            </div>
            <GitHubRepositoryTabs active="pulls" owner={owner} repo={repo} />
          </header>

          <section className="overflow-hidden rounded-lg border border-white/10 bg-[#141414]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <h2 className="my-0 text-base font-semibold text-zinc-100">Pull requests</h2>
              <span className="text-sm text-zinc-500">{pullRequests.length} pull requests</span>
            </div>
            <div className="divide-y divide-white/10">
              {pullRequests.length ? (
                pullRequests.map(pullRequest => (
                  <Link
                    className="flex items-start justify-between gap-4 px-4 py-3 text-zinc-100 no-underline hover:bg-white/[0.04]"
                    href={`/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(
                      repo
                    )}/pull/${pullRequest.number}`}
                    key={pullRequest.number}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="shrink-0 text-sm font-semibold text-zinc-500">
                          #{pullRequest.number}
                        </span>
                        <span className="truncate text-sm font-medium">{pullRequest.title}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                        <Avatar actor={pullRequest.author} />
                        <span>{pullRequest.author.login}</span>
                        <span>updated {formatDate(pullRequest.updatedAt)}</span>
                        <span>{pullRequest.headRef}</span>
                        <span>→</span>
                        <span>{pullRequest.baseRef}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2 text-xs">
                      <PullRequestState pullRequest={pullRequest} />
                      <span className="text-zinc-500">{pullRequest.commentCount} comments</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="px-4 py-8 text-sm text-zinc-500">
                  No pull requests found for this repository.
                </div>
              )}
            </div>
          </section>

          <ExternalLink
            className="self-start text-sm font-medium text-zinc-300 no-underline hover:text-white hover:underline"
            href={repository.htmlUrl}
          >
            Open repository in GitHub
          </ExternalLink>
        </div>
      </main>
    </>
  );
}

GitHubRepositoryPullsPage.Layout = DefaultLayout;

function GitHubRepositoryPullsLoading({ owner, repo }: { owner: string; repo: string }) {
  return (
    <>
      <Head>
        <title>{`${owner}/${repo} pull requests · Replay`}</title>
      </Head>
      <main className="min-h-full bg-[#0a0a0a] p-6 text-zinc-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-zinc-500">GitHub</div>
              <h1 className="my-0 mt-2 text-3xl font-semibold">Pull requests</h1>
              <Skeleton className="mt-3 h-4 w-40 bg-white/10" />
            </div>
            <GitHubRepositoryTabs active="pulls" owner={owner} repo={repo} />
          </header>
          <PullRequestListSkeleton />
        </div>
      </main>
    </>
  );
}

function GitHubRepositoryPullsError({
  connectUrl,
  message,
  owner,
  repo,
}: {
  connectUrl?: string | null;
  message: string;
  owner: string;
  repo: string;
}) {
  return (
    <>
      <Head>
        <title>{`${owner}/${repo} · GitHub · Replay`}</title>
      </Head>
      <main className="flex min-h-full items-center justify-center bg-[#0a0a0a] p-8 text-zinc-100">
        <section className="w-full max-w-lg rounded-lg border border-white/10 bg-[#141414] p-6 text-center shadow-sm">
          <h1 className="my-0 text-2xl font-semibold">GitHub repository unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-500">{message}</p>
          {connectUrl ? (
            <a
              className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-black no-underline hover:bg-zinc-200"
              href={connectUrl}
            >
              Connect GitHub
            </a>
          ) : null}
        </section>
      </main>
    </>
  );
}

function PullRequestListSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-[#141414]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <Skeleton className="h-5 w-28 bg-white/10" />
        <Skeleton className="h-4 w-24 bg-white/10" />
      </div>
      <div className="divide-y divide-white/10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="flex items-start justify-between gap-4 px-4 py-3" key={index}>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-10 bg-white/10" />
                <Skeleton className="h-4 w-3/5 bg-white/10" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-white/10" />
                <Skeleton className="h-3 w-20 bg-white/10" />
                <Skeleton className="h-3 w-24 bg-white/10" />
                <Skeleton className="h-3 w-28 bg-white/10" />
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <Skeleton className="h-6 w-16 rounded-full bg-white/10" />
              <Skeleton className="h-3 w-20 bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PullRequestState({
  pullRequest,
}: {
  pullRequest: GitHubRepositoryPullRequestList["pullRequests"][number];
}) {
  const state = pullRequest.mergedAt
    ? "Merged"
    : pullRequest.draft
      ? "Draft"
      : pullRequest.state;
  const className = pullRequest.mergedAt
    ? "bg-violet-500/15 text-violet-300"
    : pullRequest.draft
      ? "bg-white/10 text-zinc-400"
      : pullRequest.state === "open"
        ? "bg-emerald-500/15 text-emerald-300"
        : "bg-red-500/15 text-red-300";

  return (
    <span className={`rounded-full px-2 py-1 font-medium capitalize ${className}`}>{state}</span>
  );
}

function Avatar({ actor }: { actor: { avatarUrl?: string | null; login: string } }) {
  if (!actor.avatarUrl) {
    return (
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[9px] font-medium uppercase">
        {actor.login[0] ?? "?"}
      </span>
    );
  }

  return <img alt="" className="h-4 w-4 rounded-full" src={actor.avatarUrl} />;
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

  if (!owner || !repo) {
    return { notFound: true };
  }

  return {
    props: {
      owner,
      repo,
    } satisfies PageProps,
  };
}
