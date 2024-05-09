import { Icon } from "@/components/Icon";
import { LoadingProgressBar } from "@/components/LoadingProgressBar";
import { CenterAlignedPrompt } from "@/pageComponents/team/id/tests/CenterAlignedPrompt";
import { ExecutionRow } from "@/pageComponents/team/id/tests/ExecutionRow";
import { TestsViewContext } from "@/pageComponents/team/id/tests/TestsViewContext";
import { useContext } from "react";

export function SelectedTestSummary() {
  const { dateRange, isLoadingTestExecutions, showSelectTestSummaryPrompt, testExecutions } =
    useContext(TestsViewContext);

  let showOverflowMessage = false;
  switch (dateRange) {
    case "biweekly":
    case "month": {
      showOverflowMessage = true;
      break;
    }
  }

  if (isLoadingTestExecutions) {
    return <LoadingProgressBar />;
  } else if (showSelectTestSummaryPrompt) {
    return <CenterAlignedPrompt>Select test to see details here</CenterAlignedPrompt>;
  } else {
    return (
      <div className="flex flex-col gap-2 overflow-auto -mx-2">
        {testExecutions?.map(execution => (
          <ExecutionRow key={execution.id} testExecution={execution} />
        ))}
        {showOverflowMessage && (
          <div
            className="bg-slate-900 text-slate-300 mx-2 p-2 rounded"
            data-test-name="TestExecution-RetentionMessage"
          >
            <Icon className="w-4 h-4 inline" type="info" /> Test data older than one week may not be
            shown.
          </div>
        )}
      </div>
    );
  }
}
