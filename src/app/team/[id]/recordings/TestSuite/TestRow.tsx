"use client";

import { Icon } from "@/components/Icon";
import { TestSuiteTest } from "@/graphql/types";
import { useNextLink } from "@/hooks/useNextLink";
import { useSearchParamLink } from "@/hooks/useSearchParamLink";
import Link from "next/link";

export function TestRow({
  currentTestId,
  test,
}: {
  currentTestId: string | null;
  test: TestSuiteTest;
}) {
  const { isPending, onClick } = useNextLink();

  const url = useSearchParamLink("testId", () => test.id);

  const isActive = currentTestId === test.id;

  return (
    <Link
      className={`flex flex-row items-center gap-2 text-white px-2 py-1 rounded ${
        isActive ? "bg-slate-700" : "hover:bg-slate-700"
      } ${isPending ? "opacity-50" : ""}`}
      href={url ?? ""}
      onClick={onClick}
    >
      {isPending ? (
        <Icon
          className="w-6 h-6 shrink-0 animate-spin"
          type="loading-spinner"
        />
      ) : (
        <div className="w-6 h-6 shrink-0" />
      )}
      <div className="truncate shrink">{test.title}</div>
    </Link>
  );
}
