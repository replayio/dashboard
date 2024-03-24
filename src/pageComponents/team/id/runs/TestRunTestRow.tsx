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
      className={`w-full flex flex-row items-center gap-2 whitespace-nowrap text-white px-2 py-1 outline-0 ${
        isActive
          ? "bg-slate-700 cursor-default"
          : "focus:text-sky-500 hover:bg-slate-700 cursor-pointer"
      }`}
      data-test-name="TestRunTests-Row"
      onClick={() => selectTest(test.id)}
    >
      <div className="truncate shrink grow">{test.title}</div>
    </Component>
  );
}
