"use client";

import { Icon } from "@/components/Icon";
import { TestSuiteTestSummary } from "@/graphql/types";
import { useNextLink } from "@/hooks/useNextLink";
import { useSearchParamLink } from "@/hooks/useSearchParamLink";
import Link from "next/link";
import { ReactNode } from "react";

export function TestSummaryRow({
  currentTestSummaryId,
  showFlakyRate,
  testSummary,
}: {
  currentTestSummaryId: string | null;
  showFlakyRate: boolean;
  testSummary: TestSuiteTestSummary;
}) {
  const { isPending, onClick } = useNextLink();

  const url = useSearchParamLink("testSummaryId", () => testSummary.id);

  const isActive = testSummary.id === currentTestSummaryId;

  let icon: ReactNode = null;
  if (isPending) {
    icon = <Icon className="w-6 h-6 animate-spin" type="loading-spinner" />;
  } else if (showFlakyRate) {
    icon = (
      <div className="flex items-center justify-center bg-yellow-500 text-black w-full h-6 rounded-md shrink-0 text-xs">
        {Math.round(testSummary.stats.flakyRate * 100)}%
      </div>
    );
  } else if (testSummary.stats.failureRate > 0) {
    icon = (
      <div className="flex items-center justify-center bg-rose-600 text-white w-full h-6 rounded-md shrink-0 text-xs">
        {Math.round(testSummary.stats.failureRate * 100)}%
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
      <div className="truncate">{testSummary.title}</div>
    </Link>
  );
}
