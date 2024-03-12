"use client";

import { Icon } from "@/components/Icon";
import { TestRun, TestSuiteTestRunWithRecordings } from "@/graphql/types";
import { useNextLink } from "@/hooks/useNextLink";
import Link from "next/link";
import { formatRelativeTime } from "@/utils/number";
import { getTestRunTitle } from "@/utils/test-runs";

export function TestSuiteRun({
  test,
  workspaceId,
}: {
  test: TestSuiteTestRunWithRecordings;
  workspaceId: string;
}) {
  const { isPending, onClick } = useNextLink();

  // TODO Convert to a tree (memoized)

  const params = new URLSearchParams("");
  // params.set("testRunId", testRun.id);

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
