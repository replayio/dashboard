import Link from "next/link";

type GitHubRepositoryTabsProps = {
  active: "code" | "pulls";
  owner: string;
  repo: string;
};

export function GitHubRepositoryTabs({ active, owner, repo }: GitHubRepositoryTabsProps) {
  const codeHref = `/github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const pullsHref = `${codeHref}/pulls`;

  return (
    <nav className="flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1 text-sm">
      <TabLink active={active === "code"} href={codeHref}>
        Code
      </TabLink>
      <TabLink active={active === "pulls"} href={pullsHref}>
        PRs
      </TabLink>
    </nav>
  );
}

function TabLink({
  active,
  children,
  href,
}: {
  active: boolean;
  children: string;
  href: string;
}) {
  return (
    <Link
      className={`inline-flex h-8 items-center rounded px-3 font-medium no-underline transition-colors ${
        active
          ? "bg-white text-black"
          : "text-zinc-400 hover:bg-white/[0.08] hover:text-zinc-100"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
