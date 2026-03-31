"use client";

import { useSidebar } from "@/components/SidebarContext";

/**
 * Skeleton for workspace links in the left nav while `useWorkspaces` is loading.
 * Matches LeftNavLink spacing; adapts when the sidebar is collapsed.
 */
export function WorkspaceNavLoading({ rowCount = 6 }: { rowCount?: number }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="relative flex flex-col gap-0.5 pt-2"
    >
      <span className="sr-only">Loading workspaces…</span>

      <div className="absolute left-2 right-2 top-0 h-0.5 overflow-hidden rounded-full bg-primary/10">
        <div className="indeterminate h-full w-full bg-primary/70 origin-left" />
      </div>

      {Array.from({ length: rowCount }, (_, i) => (
        <div
          key={i}
          className={`animate-pulse rounded-md ${
            isCollapsed
              ? "flex justify-center px-2 py-3"
              : "flex flex-row items-center gap-2.5 px-3 py-2.5"
          }`}
          aria-hidden
        >
          <div className="h-5 w-5 shrink-0 rounded bg-muted" />
          {!isCollapsed && (
            <div
              className={`h-3.5 max-w-[160px] flex-1 rounded-md bg-muted ${
                i % 3 === 0 ? "w-4/5" : i % 3 === 1 ? "w-3/5" : "w-2/3"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
