import { expect, test } from "@playwright/test";
import { getRecordingRow } from "./utils/getRecordingRow";
import { getTestExecutionRow } from "./utils/getTestExecutionRow";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suite-tests-2: failed test executions", async ({ page }) => {
  await navigateToPage({
    mockKey: "TESTS_WITH_FAILURES",
    page,
    pathname:
      "/team/dzowNDAyOGMwYS05ZjM1LTQ2ZjktYTkwYi1jNzJkMTIzNzUxOTI=/tests",
  });

  {
    // Select the test run
    const rows = getTestSummaryRow(page);
    await expect(rows).toHaveCount(1);
    await rows.click();
  }

  {
    // Verify test run details
    const recordingRows = getRecordingRow(page);
    await expect(recordingRows).toHaveCount(3);

    const executionRows = getTestExecutionRow(page);
    await expect(executionRows).toHaveCount(2);
    await expect(await executionRows.nth(0).textContent()).toContain(
      "Commit with 2 failed tests"
    );
    await expect(await executionRows.nth(1).textContent()).toContain(
      "Commit with 1 passing test"
    );
  }
});
