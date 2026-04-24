import { DeepLinkWarningDialog } from "@/components/DeepLinkWarningDialog";
import { RunsViewContext } from "@/pageComponents/team/id/runs/TestRunsContext";
import { useContext } from "react";
import { TestRunTests } from "@/pageComponents/team/id/runs/TestRunTests";
import TestRuns from "@/pageComponents/team/id/runs/TestRuns";
import { TestsAndExecutions } from "@/pageComponents/team/id/runs/TestsAndExecutions";

export function TestSuiteRunsPage() {
  const { dismissDeepLinkWarning, showDeepLinkWarning } = useContext(RunsViewContext);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 p-4 overflow-auto overflow-hidden h-full">
        <div
          className="bg-card text-foreground p-3 rounded-lg border border-border basis-6/12 md:basis-4/12 overflow-auto flex flex-col gap-2 relative"
          data-test-id="TestSuite-TestRuns"
        >
          <TestRuns />
        </div>
        <div
          className="bg-card text-foreground p-3 rounded-lg border border-border basis-6/12 md:basis-4/12 overflow-auto flex flex-col gap-2 relative"
          data-test-id="TestSuite-TestRunDetails"
        >
          <TestRunTests />
        </div>
        <div
          className="bg-card text-foreground p-3 rounded-lg border border-border basis-4/12 overflow-auto flex flex-col gap-2 relative"
          data-test-id="TestSuite-TestDetails"
        >
          <TestsAndExecutions />
        </div>
      </div>
      <DeepLinkWarningDialog onDismiss={dismissDeepLinkWarning} visible={showDeepLinkWarning} />
    </>
  );
}
