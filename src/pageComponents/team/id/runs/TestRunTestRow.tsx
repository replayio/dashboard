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

  const Component = isActive ? "div" : "button";

  return (
    <Component
      className={`w-full px-2 py-1 outline-0 ${
        isActive
          ? "text-sky-500 cursor-default"
          : "focus:text-sky-500 hover:text-sky-500 cursor-pointer text-white"
      }`}
      data-selected={isActive || undefined}
      data-test-name="TestRunTests-Row"
      onClick={() => selectTest(test.id)}
    >
      <div className="truncate shrink grow text-slate-400 text-xs">{test.sourcePath}</div>
      <div className="truncate shrink grow">{test.title}</div>
    </Component>
  );
}
