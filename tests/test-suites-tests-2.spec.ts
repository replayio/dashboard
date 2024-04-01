import { expect, test } from "@playwright/test";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { getRecordingRow } from "./utils/getRecordingRow";
import { getTestExecutionRow } from "./utils/getTestExecutionRow";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-tests-2: failed test executions", async ({ page }) => {
  await navigateToPage({
    mockKey: "TESTS_WITH_FAILURES",
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/tests`,
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

  {
    // Reloading the page should remember the previous selections

    const selectedRow = getTestSummaryRow(page, { selected: true });
    await expect(selectedRow).toBeVisible();
    await expect(await selectedRow.textContent()).toContain("Failed test");

    const executionRows = getTestExecutionRow(page);
    await expect(executionRows).toHaveCount(2);
  }
});
