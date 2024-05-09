import { SelectedTestSummary } from "@/pageComponents/team/id/tests/SelectedTestSummary";
import { TestSummaries } from "@/pageComponents/team/id/tests/TestSummaries";

export function TestSuiteTestsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-2 p-2 overflow-auto overflow-hidden h-full">
      <div
        className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2 relative"
        data-test-id="TestSuite-TestSummaries"
      >
        <TestSummaries />
      </div>
      <div
        className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2 relative"
        data-test-id="TestSuite-TestExecutions"
      >
        <SelectedTestSummary />
      </div>
    </div>
  );
}
