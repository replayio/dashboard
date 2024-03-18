"use client";

import { TestSuiteTest } from "@/graphql/types";

export function TestRunTestRow({
  currentTestId,
  selectTest,
  test,
}: {
  currentTestId: string | undefined;
  selectTest: (id: string) => void;
  test: TestSuiteTest;
}) {
  const isActive = currentTestId === test.id;

  return (
    <div
      className={`flex flex-row items-center gap-2 whitespace-nowrap text-white px-2 py-1 rounded ${
        isActive
          ? "bg-slate-700 cursor-default"
          : "hover:bg-slate-700 cursor-pointer"
      }`}
      onClick={() => selectTest(test.id)}
    >
      <div className="truncate shrink grow">{test.title}</div>
    </div>
  );
}
