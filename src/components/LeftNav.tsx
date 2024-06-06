import { Icon } from "@/components/Icon";
import { ReplayLogo } from "@/components/ReplayLogo";
import { HomeNavLink } from "@/components/layout/HomeNavLink";
import { MyLibraryNavLink } from "@/components/layout/MyLibraryLink";
import { CreateTestSuiteLink } from "@/components/layout/CreateTestSuiteLink";
import { NewTeamLink } from "@/components/layout/NewTeamLink";
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
    <div className="flex flex-col w-32 h-full p-0 pr-0 overflow-auto text-white border-r bg-slate-800 shrink-0 md:w-72 border-slate-700">
      <div className="flex flex-row items-center gap-2 p-2">
        <ReplayLogo className="pl-1 max-h-6 max-w-5" color="#ffffff" />
        <div className="text-xl font-light">Replay</div>
      </div>
      <nav className="relative flex flex-col px-1 overflow-auto shrink-0">
        <HomeNavLink />
        <MyLibraryNavLink />
        <hr className="w-4/5 mx-auto my-3 border-slate-900" />
        <CreateTestSuiteLink />
        <NewTeamLink />
        <hr className="w-4/5 mx-auto my-3 border-slate-900" />
      </nav>
      <nav className="relative flex flex-col p-1 overflow-auto grow">
        {backLink && (
          <Link
            className="flex flex-row items-center px-2 py-1 overflow-auto text-lg text-white truncate hover:text-sky-400 whitespace-nowrap shrink-0"
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
