import { DeepLinkWarningDialog } from "@/components/DeepLinkWarningDialog";
import { SelectedTestSummary } from "@/pageComponents/team/id/tests/SelectedTestSummary";
import { TestSummaries } from "@/pageComponents/team/id/tests/TestSummaries";
import { TestsViewContext } from "@/pageComponents/team/id/tests/TestsViewContext";
import { useContext } from "react";

export function TestSuiteTestsPage() {
  const { dismissDeepLinkWarning, showDeepLinkWarning } = useContext(TestsViewContext);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 p-4 overflow-auto overflow-hidden h-full">
        <div
          className="bg-card text-foreground p-3 rounded-lg border border-border basis-2/4 overflow-auto flex flex-col gap-2 relative"
          data-test-id="TestSuite-TestSummaries"
        >
          <TestSummaries />
        </div>
        <div
          className="bg-card text-foreground p-3 rounded-lg border border-border basis-2/4 overflow-auto flex flex-col gap-2 relative"
          data-test-id="TestSuite-TestExecutions"
        >
          <SelectedTestSummary />
        </div>
      </div>
      <DeepLinkWarningDialog onDismiss={dismissDeepLinkWarning} visible={showDeepLinkWarning} />
    </>
  );
}
