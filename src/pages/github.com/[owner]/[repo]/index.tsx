import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useGithubApi } from "@/hooks/useGithubApi";
import type { GitHubRepositoryTreeView } from "@/lib/githubPullRequest";
import { GitHubRepositoryEditor } from "@/pageComponents/github/GitHubRepositoryEditor";
import { GitHubRepositoryTopBar } from "@/pageComponents/github/GitHubRepositoryTabs";
import { getValueFromArrayOrString } from "@/utils/getValueFromArrayOrString";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

type RepositoryTreeResponse = {
  connected: boolean;
  connectUrl: string;
  error?: string;
  repositoryTree: GitHubRepositoryTreeView | null;
};

type PageProps = {
  owner: string;
  repo: string;
};

export default function GitHubRepositoryPage({
  owner,
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const selectedPath = getValueFromArrayOrString(router.query.path);
  const repositoryTreeUrl = `/api/github/repository-tree?owner=${encodeURIComponent(
    owner
  )}&repo=${encodeURIComponent(repo)}${
    selectedPath ? `&path=${encodeURIComponent(selectedPath)}` : ""
  }`;
  const { data, error, isLoading } = useGithubApi<RepositoryTreeResponse>(repositoryTreeUrl);

  function handleSelectPath(path: string) {
    const query = { ...router.query, path };
    void router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
  }

  if (isLoading) {
    return <GitHubRepositoryLoading owner={owner} repo={repo} />;
  }

  if (error || data?.error) {
    return (
      <GitHubRepositoryError
        message={error ?? data?.error ?? "Unable to load this GitHub repository."}
        owner={owner}
        repo={repo}
      />
    );
  }

  if (data && !data.connected) {
    return (
      <GitHubRepositoryError
        connectUrl={data.connectUrl}
        message="Connect GitHub so Replay can load this repository."
        owner={owner}
        repo={repo}
      />
    );
  }

  if (!data?.repositoryTree) {
    return <GitHubRepositoryLoading owner={owner} repo={repo} />;
  }

  return (
    <>
      <Head>
        <title>{`${data.repositoryTree.repository.fullName} · Replay`}</title>
      </Head>
      <GitHubRepositoryEditor
        onSelectPath={handleSelectPath}
        owner={owner}
        repo={repo}
        repositoryTree={data.repositoryTree}
      />
    </>
  );
}

GitHubRepositoryPage.Layout = DefaultLayout;

function GitHubRepositoryLoading({ owner, repo }: { owner: string; repo: string }) {
  return (
    <>
      <Head>
        <title>{`${owner}/${repo} · GitHub · Replay`}</title>
      </Head>
      <main className="flex h-full min-h-[680px] flex-col bg-[#0a0a0a] text-zinc-100">
        <GitHubRepositoryTopBar active="code" owner={owner} repo={repo} />
        <div className="flex min-h-0 flex-1 flex-col">
          <section className="min-h-0 w-full flex-1 overflow-hidden bg-[#050505]">
            <div className="grid h-full min-h-0 grid-cols-[260px_minmax(0,1fr)] md:grid-cols-[280px_minmax(0,1fr)]">
              <aside className="min-h-0 border-r border-white/10 bg-[#151515]">
                <div className="space-y-2 p-4">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <Skeleton
                      className="h-4 bg-white/10"
                      key={index}
                      style={{
                        marginLeft: `${(index % 4) * 16}px`,
                        width: `${52 + (index % 5) * 7}%`,
                      }}
                    />
                  ))}
                </div>
              </aside>
              <section className="min-h-0 min-w-0 bg-[#050505]">
                <div className="flex h-11 items-center border-b border-white/10 bg-[#090909] px-3">
                  <Skeleton className="h-8 w-64 bg-white/10" />
                </div>
                <div className="space-y-3 p-5">
                  {Array.from({ length: 22 }).map((_, index) => (
                    <div className="flex items-center gap-4" key={index}>
                      <Skeleton className="h-4 w-8 bg-white/10" />
                      <Skeleton
                        className="h-4 bg-white/10"
                        style={{ width: `${50 + (index % 6) * 7}%` }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function GitHubRepositoryError({
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
