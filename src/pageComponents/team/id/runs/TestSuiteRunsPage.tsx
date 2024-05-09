import { TestRunTests } from "@/pageComponents/team/id/runs/TestRunTests";
import TestRuns from "@/pageComponents/team/id/runs/TestRuns";
import { TestsAndExecutions } from "@/pageComponents/team/id/runs/TestsAndExecutions";

export function TestSuiteRunsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-2 p-2 overflow-auto overflow-hidden h-full">
      <div
        className="bg-slate-800 text-white p-2 rounded basis-6/12 md:basis-4/12 overflow-auto flex flex-col gap-2 relative"
        data-test-id="TestSuite-TestRuns"
      >
        <TestRuns />
      </div>
      <div
        className="bg-slate-800 text-white p-2 rounded basis-6/12 md:basis-4/12 overflow-auto flex flex-col gap-2 relative"
        data-test-id="TestSuite-TestRunDetails"
      >
        <TestRunTests />
      </div>
      <div
        className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2 relative"
        data-test-id="TestSuite-TestDetails"
      >
        <TestsAndExecutions />
      </div>
    </div>
  );
}
