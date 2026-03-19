import { Icon } from "@/components/Icon";
import { LeftNavLink } from "@/components/LeftNavLink";
import { ReplayLogo } from "@/components/ReplayLogo";
import { HomeNavLink } from "@/components/layout/HomeNavLink";
import { MyLibraryNavLink } from "@/components/layout/MyLibraryLink";
import { CurrentUser } from "@/pageComponents/team/layout/CurrentUser";
import Link from "next/link";
import { PropsWithChildren } from "react";

export function LeftNav({
  backLink,
  children,
}: PropsWithChildren<{
  backLink?: {
    href: string;
    label: string;
  };
}>) {
  return (
    <div className="flex flex-col w-32 h-full p-0 pr-0 overflow-auto text-foreground bg-card border-r border-border/50 shrink-0 md:w-72">
      <div className="flex flex-row items-center gap-2 px-3 py-3 border-b border-border/50">
        <ReplayLogo className="max-h-5 max-w-4" color="#F02D5E" />
        <div className="text-base font-semibold">Replay</div>
      </div>
      <nav className="relative flex flex-col px-2 py-2 overflow-auto shrink-0">
        <HomeNavLink />
        <MyLibraryNavLink />
        <hr className="w-4/5 mx-auto my-3 border-border" />
        <LeftNavLink
          href="/team/new/tests"
          iconType="create"
          isActive={false}
          label="Create test suite"
        />
        <LeftNavLink
          href="/team/new/standard"
          iconType="create"
          isActive={false}
          label="Create new team"
        />
        <hr className="w-4/5 mx-auto my-3 border-border" />
      </nav>
      <nav className="relative flex flex-col px-2 overflow-auto grow">
        {backLink && (
          <Link
            className="flex flex-row items-center gap-1 px-3 py-2 overflow-auto text-sm font-medium truncate text-foreground hover:text-foreground/70 whitespace-nowrap shrink-0"
            data-test-id="LeftNavLink-BackLink"
            href={backLink.href}
            title={backLink.label}
          >
            <Icon className="w-4 h-4 shrink-0" type="back-arrow" />
            <div className="truncate">{backLink.label}</div>
          </Link>
        )}
        {children}
      </nav>
      <CurrentUser />
    </div>
  );
}
