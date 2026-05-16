import { ExternalLink } from "@/components/ExternalLink";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useGithubApi } from "@/hooks/useGithubApi";
import type { GitHubRepositorySummary } from "@/lib/githubConnectedAccount";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";

type RepositoriesResponse = {
  connected: boolean;
  connectUrl: string;
  error?: string;
  repositories: GitHubRepositorySummary[];
};

type PageProps = {
  owner: string;
};

export default function GitHubOwnerPage({
  owner,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const repositoriesUrl = `/api/github/repositories?owner=${encodeURIComponent(owner)}`;
  const { data, error, isLoading } = useGithubApi<RepositoriesResponse>(repositoriesUrl);
  const repositoryList = data?.repositories ?? [];

  return (
    <>
      <Head>
        <title>{`${owner} · GitHub · Replay`}</title>
      </Head>
      <main className="min-h-full bg-background p-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <header>
            <div className="text-sm font-medium text-muted-foreground">GitHub</div>
            <h1 className="my-0 mt-1 text-3xl font-semibold">{owner}</h1>
          </header>

          {isLoading ? (
            <RepositoryListSkeleton />
          ) : error || data?.error ? (
            <GitHubMessage title="GitHub repositories unavailable" message={error ?? data?.error} />
          ) : data && !data.connected ? (
            <ConnectGitHubCard connectUrl={data.connectUrl} />
          ) : (
            <section className="rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 className="my-0 text-base font-semibold">Repositories</h2>
                <span className="text-sm text-muted-foreground">
                  {repositoryList.length} repositories
                </span>
              </div>
              <div className="divide-y divide-border">
                {repositoryList.length ? (
                  repositoryList.map(repository => (
                    <div
                      className="flex items-center justify-between gap-4 px-4 py-3"
                      key={repository.id}
                    >
                      <Link
                        className="min-w-0 flex-1 text-foreground no-underline hover:text-primary"
                        href={`/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(
                          repository.name
                        )}`}
                      >
                        <div className="truncate text-sm font-medium">{repository.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {repository.private ? "Private" : "Public"}
                          {repository.defaultBranch ? ` · ${repository.defaultBranch}` : ""}
                        </div>
                      </Link>
                      <Link
                        className="shrink-0 text-sm font-medium text-primary no-underline hover:underline"
                        href={`/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(
                          repository.name
                        )}`}
                      >
                        Browse code
                      </Link>
                      <ExternalLink
                        className="shrink-0 text-sm font-medium text-primary no-underline hover:underline"
                        href={repository.htmlUrl}
                      >
                        Open in GitHub
                      </ExternalLink>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-sm text-muted-foreground">
                    No repositories found for this GitHub workspace.
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

GitHubOwnerPage.Layout = DefaultLayout;

function ConnectGitHubCard({ connectUrl }: { connectUrl: string }) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="my-0 text-lg font-semibold">Connect GitHub</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Connect GitHub to load repositories for this workspace.
      </p>
      <a
        className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground no-underline hover:bg-primary/90"
        href={connectUrl}
      >
        Connect GitHub
      </a>
    </section>
  );
}

function GitHubMessage({ message, title }: { message?: string | null; title: string }) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="my-0 text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {message || "Replay could not load this GitHub data."}
      </p>
    </section>
  );
}

function RepositoryListSkeleton() {
  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="flex items-center justify-between gap-4 px-4 py-3" key={index}>
            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-48 max-w-full" />
              <Skeleton className="mt-2 h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const owner = getValueFromArrayOrString(context.params?.owner);
  if (!owner) return { notFound: true };

  return {
    props: {
      owner,
    } satisfies PageProps,
  };
}
