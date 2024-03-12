"use client";

import { TestSuiteTest } from "@/graphql/types";
import { useNextLink } from "@/hooks/useNextLink";
import Link from "next/link";

export function TestRow({
  test,
  workspaceId,
}: {
  test: TestSuiteTest;
  workspaceId: string;
}) {
  const { isPending, onClick } = useNextLink();

  // TODO Convert to a tree (memoized)

  // const url = new URL(window.location.href);
  // url.searchParams.set("testRunId", test.id);
  const isActive = false; // TODO

  return (
    <Link
      className={`flex flex-row items-center gap-2 text-white px-2 py-1 rounded ${
        isActive ? "bg-slate-700" : "hover:bg-slate-700"
      } ${isPending ? "opacity-50" : ""}`}
      href=""
      onClick={onClick}
    >
      <div className="truncate shrink">{test.title}</div>
    </Link>
  );
}
