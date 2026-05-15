import { LeftNavLink } from "@/components/LeftNavLink";
import { GitHubRepositoryOwner } from "@/hooks/useGithubRepositoryOwners";
import { usePathname } from "next/navigation";

export function GitHubWorkspaceNavLink({ owner }: { owner: GitHubRepositoryOwner }) {
  const pathname = usePathname();
  const href = `/github.com/${encodeURIComponent(owner.login)}`;
  const isActive = pathname === href || Boolean(pathname?.startsWith(`${href}/`));

  return (
    <LeftNavLink
      href={href}
      iconType={owner.type === "User" ? "account" : "organization"}
      isActive={isActive}
      label={
        <div className="flex min-w-0 flex-row items-center gap-2">
          <div className="truncate">{owner.login}</div>
          {owner.installationId ? (
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
              App
            </span>
          ) : null}
        </div>
      }
      title={`GitHub: ${owner.login}`}
    />
  );
}
