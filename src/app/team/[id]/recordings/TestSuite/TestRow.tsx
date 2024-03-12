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

  return (
    <Link
      className={`flex flex-row items-center gap-2 whitespace-nowrap text-white p-1 rounded ${
        isPending ? "opacity-50" : ""
      }`}
      href=""
      onClick={onClick}
    >
      {test.title}
    </Link>
  );
}
