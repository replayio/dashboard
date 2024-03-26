import { Icon } from "@/components/Icon";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { CreateTeamButton } from "@/pageComponents/team/layout/CreateTeamButton";
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
  const { user } = useCurrentUser();

  return (
    <div className="flex flex-col gap-2 h-full text-white overflow-auto shrink-0 w-72 p-2 pr-0">
      <div className="flex flex-row items-center gap-2 p-2 bg-slate-950 rounded">
        <ReplayLogo className="max-h-6 max-w-6" />
        <div className="text-xl font-bold">Replay</div>
      </div>
      <nav className="flex flex-col overflow-auto bg-slate-800 rounded grow relative">
        {backLink && (
          <Link
            className="px-2 py-1 flex flex-row items-center text-lg text-white hover:text-sky-400 overflow-auto truncate whitespace-nowrap"
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
      {!backLink && user && (
        <CreateTeamButton isInternalUser={user?.isInternal == true} />
      )}
      <CurrentUser />
    </div>
  );
}
