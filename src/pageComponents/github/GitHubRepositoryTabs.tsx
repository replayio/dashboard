import Link from "next/link";

type GitHubRepositoryTabsProps = {
  active: "code" | "pulls";
  owner: string;
  repo: string;
};

type GitHubRepositoryTopBarProps = GitHubRepositoryTabsProps & {
  repoName?: string;
};

export function GitHubRepositoryTopBar({
  active,
  owner,
  repo,
  repoName = repo,
}: GitHubRepositoryTopBarProps) {
  const ownerHref = `/github.com/${encodeURIComponent(owner)}`;
  const repoHref = `${ownerHref}/${encodeURIComponent(repo)}`;

  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#0f0f0f] px-4 text-zinc-100 md:px-6">
      <nav
        aria-label="Repository breadcrumb"
        className="flex min-w-0 items-center gap-2 text-sm text-zinc-500"
      >
        <span className="hidden font-medium sm:inline">GitHub</span>
        <span className="hidden sm:inline">/</span>
        <Link
          className="min-w-0 truncate text-zinc-400 no-underline hover:text-zinc-100 hover:underline"
          href={ownerHref}
        >
          {owner}
        </Link>
        <span>/</span>
        <Link
          className="min-w-0 truncate font-medium text-zinc-100 no-underline hover:text-white hover:underline"
          href={repoHref}
        >
          {repoName}
        </Link>
      </nav>
      <GitHubRepositoryTabs active={active} owner={owner} repo={repo} />
    </div>
  );
}

export function GitHubRepositoryTabs({ active, owner, repo }: GitHubRepositoryTabsProps) {
  const codeHref = `/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const pullsHref = `${codeHref}/pulls`;

  return (
    <nav className="flex shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1 text-sm">
      <TabLink active={active === "code"} href={codeHref}>
        Code
      </TabLink>
      <TabLink active={active === "pulls"} href={pullsHref}>
        PRs
      </TabLink>
    </nav>
  );
}

function TabLink({ active, children, href }: { active: boolean; children: string; href: string }) {
  return (
    <Link
      className={`inline-flex h-8 items-center rounded px-3 font-medium no-underline transition-colors ${
        active ? "bg-white text-black" : "text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-100"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
