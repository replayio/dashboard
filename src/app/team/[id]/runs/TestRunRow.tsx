"use client";

import { Icon } from "@/components/Icon";
import { TestRun } from "@/graphql/types";
import { useNextLink } from "@/hooks/useNextLink";
import { useSearchParamLink } from "@/hooks/useSearchParamLink";
import { formatRelativeTime } from "@/utils/number";
import { getTestRunTitle } from "@/utils/test-suites";
import Link from "next/link";
import { ReactNode } from "react";

export function TestRunRow({
  currentTestRunId,
  testRun,
}: {
  currentTestRunId: string | null;
  testRun: TestRun;
}) {
  const { isPending, onClick } = useNextLink();

  const isActive = testRun.id === currentTestRunId;

  const url = useSearchParamLink(
    "testRunId",
    () => testRun.id,
    (searchParams: URLSearchParams) => {
      // Reset test filters on change
      searchParams.set("testFilter", "");
      searchParams.set("testStatus", "");
    }
  );

  let icon: ReactNode;
  if (isPending) {
    icon = <Icon className="w-6 h-6 animate-spin" type="loading-spinner" />;
  } else if (testRun.numFailed > 0) {
    icon = (
      <div className="flex items-center justify-center bg-rose-600 text-white w-full h-6 rounded shrink-0 text-xs">
        {testRun.numFailed}
      </div>
    );
  } else {
    icon = (
      <Icon
        className="text-green-500 w-6 h-6 shrink-0"
        type="passing-test-run"
      />
    );
  }

  return (
    <Link
      className={`flex flex-row items-center gap-2 whitespace-nowrap text-white p-1 rounded ${
        isActive ? "bg-slate-700" : "hover:bg-slate-700"
      } ${isPending ? "opacity-50" : ""}`}
      href={url ?? ""}
      onClick={onClick}
    >
      <div className="w-10 h-6 shrink-0 flex justify-center">{icon}</div>
      <div className="grow truncate">{getTestRunTitle(testRun)}</div>
      <div className="flex flex-row gap-1 items-center shrink-0 text-sm text-slate-300">
        <Icon className="w-4 h-4" type="clock" />
        {formatRelativeTime(testRun.date)}
      </div>
    </Link>
  );
}
