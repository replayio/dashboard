import { Icon } from "@/components/Icon";
import { LeftNavLink } from "@/components/LeftNavLink";
import { NavTooltip } from "@/components/NavTooltip";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useSidebar } from "@/components/SidebarContext";
import { HomeNavLink } from "@/components/layout/HomeNavLink";
import { MyLibraryNavLink } from "@/components/layout/MyLibraryLink";
import { CurrentUser } from "@/pageComponents/team/layout/CurrentUser";
import Link from "next/link";
import { PropsWithChildren } from "react";

const SIDEBAR_WIDTH_COLLAPSED = 60;
const SIDEBAR_WIDTH_EXPANDED = 288; // w-72 = 18rem = 288px

export const SIDEBAR_WIDTHS = {
  collapsed: SIDEBAR_WIDTH_COLLAPSED,
  expanded: SIDEBAR_WIDTH_EXPANDED,
} as const;

export function LeftNav({
  backLink,
  children,
}: PropsWithChildren<{
  backLink?: {
    href: string;
    label: string;
  };
}>) {
  const { isCollapsed, toggleCollapsed } = useSidebar();

  const handleSidebarClick = () => {
    if (isCollapsed) {
      toggleCollapsed();
    }
  };

  return (
    <div
      className={`flex flex-col h-full overflow-auto text-foreground bg-card border-r border-border/50 shrink-0 fixed top-0 left-0 z-40 shadow-2xl hover:shadow-3xl backdrop-blur-sm transition-all duration-300 ease-out ${
        isCollapsed ? "w-[60px] cursor-pointer lg:w-[60px]" : "w-32 md:w-72 lg:w-72"
      }`}
      onClick={handleSidebarClick}
    >
      <div className="flex flex-1 flex-col h-full w-full overflow-hidden">
        {/* Header */}
        <div className="border-b border-border/50 transition-all duration-300 py-3">
          <div
            className={`flex items-center w-full  ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div className={`flex items-center w-full ${isCollapsed ? "justify-center" : "gap-3"}`}>
              {isCollapsed ? (
                <div className="relative w-full flex justify-center py-2 group">
                  <div className="flex h-6 w-6 items-center justify-center group-hover:opacity-0 group-hover:pointer-events-none transition-opacity">
                    <ReplayLogo className="max-h-6 max-w-5" color="#F02D5E" />
                  </div>
                  <button
                    className="absolute inset-0 flex items-center justify-center rounded-md hover:bg-accent transition-all opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    onClick={e => {
                      e.stopPropagation();
                      toggleCollapsed();
                    }}
                    aria-label="Expand sidebar"
                  >
                    <Icon className="h-5 w-5 text-foreground" type="sidebar" />
                  </button>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between gap-3 ml-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <ReplayLogo className="max-h-5 max-w-4 shrink-0" color="#F02D5E" />
                    <span className="text-base font-semibold truncate">Replay</span>
                  </div>
                  <button
                    className="h-8 w-8 flex shrink-0 items-center justify-center rounded-md hover:bg-accent transition-colors"
                    onClick={e => {
                      e.stopPropagation();
                      toggleCollapsed();
                    }}
                    aria-label="Collapse sidebar"
                  >
                    <Icon className="h-5 w-5 rotate-180 text-foreground" type="sidebar" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Nav items */}
          <nav className="relative flex flex-col items-stretch py-2 overflow-auto shrink-0 px-2">
            <HomeNavLink />
            <MyLibraryNavLink />
            <hr className="w-full mx-auto my-3 border-border" />
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
            <hr className="w-full mx-auto my-3 border-border" />
          </nav>
        </div>

        <nav className="relative flex flex-col items-stretch overflow-auto grow py-2 px-2">
          {backLink &&
            (isCollapsed ? (
              <NavTooltip tooltip={backLink.label} side="right">
                <Link
                  className="flex w-full justify-center px-2 py-2 text-sm font-medium text-foreground hover:text-foreground/70 shrink-0"
                  data-test-id="LeftNavLink-BackLink"
                  href={backLink.href}
                  onClick={e => e.stopPropagation()}
                >
                  <Icon className="w-5 h-5 shrink-0" type="back-arrow" />
                </Link>
              </NavTooltip>
            ) : (
              <Link
                className="flex flex-row items-center gap-1 overflow-auto text-sm font-medium truncate text-foreground hover:text-foreground/70 whitespace-nowrap shrink-0 px-3 py-2"
                data-test-id="LeftNavLink-BackLink"
                href={backLink.href}
                onClick={e => e.stopPropagation()}
              >
                <Icon className="w-5 h-5 shrink-0" type="back-arrow" />
                <div className="truncate">{backLink.label}</div>
              </Link>
            ))}
          {children}
        </nav>

        <div onClick={e => e.stopPropagation()}>
          <CurrentUser />
        </div>
      </div>
    </div>
  );
}
