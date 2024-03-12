"use client";

import { Icon } from "@/components/Icon";
import { TestRun } from "@/graphql/types";
import { useNextLink } from "@/hooks/useNextLink";
import Link from "next/link";
import { formatRelativeTime } from "@/utils/number";
import { getTestRunTitle } from "@/utils/test-runs";

export function TestSuiteRuns({
  currentTestRunId,
  testRun,
  workspaceId,
}: {
  currentTestRunId: string | null;
  testRun: TestRun;
  workspaceId: string;
}) {
  const { isPending, onClick } = useNextLink();

  const isActive = testRun.id === currentTestRunId;

  const params = new URLSearchParams("");
  params.set("testRunId", testRun.id);

  return (
    <Link
      className={`flex flex-row items-center gap-2 whitespace-nowrap text-white p-1 rounded ${
        isActive ? "bg-slate-700" : "hover:bg-slate-700"
      } ${isPending ? "opacity-50" : ""}`}
      href={`/team/${workspaceId}/recordings?${params.toString()}`}
      onClick={onClick}
    >
      {isPending ? (
        <Icon className="w-6 h-6 animate-spin" type="loading-spinner" />
      ) : testRun.numFailed === 0 ? (
        <Icon
          className="text-green-500 w-6 h-6 shrink-0"
          type="passing-test-run"
        />
      ) : (
        <div className="flex items-center justify-center bg-rose-600 text-white w-6 h-6 rounded shrink-0 text-xs">
          {testRun.numFailed}
        </div>
      )}
      <div className="grow truncate">{getTestRunTitle(testRun)}</div>
      <div className="flex flex-row gap-1 items-center shrink-0 text-slate-500">
        <Icon className="w-4 h-4" type="clock" />
        {formatRelativeTime(testRun.date)}
      </div>
    </Link>
  );
}
