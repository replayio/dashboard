import { expect, test } from "@playwright/test";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MOCK_DATA } from "./mocks/data";
import { getRecordingRow } from "./utils/getRecordingRow";
import { getTestExecutionRow } from "./utils/getTestExecutionRow";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-tests-3: flaky test executions", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData: MOCK_DATA.TESTS_WITH_FLAKES,
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
    await expect(recordingRows).toHaveCount(5);

    const executionRows = getTestExecutionRow(page);
    await expect(executionRows).toHaveCount(2);
    await expect(await executionRows.nth(0).textContent()).toContain(
      "Commit with 3 flaky tests"
    );
    await expect(await executionRows.nth(1).textContent()).toContain(
      "Commit with 2 flaky test"
    );
  }

  {
    // Reloading the page should remember the previous selections

    const selectedRow = getTestSummaryRow(page, { selected: true });
    await expect(selectedRow).toBeVisible();
    await expect(await selectedRow.textContent()).toContain("Flaky test run");

    const executionRows = getTestExecutionRow(page);
    await expect(executionRows).toHaveCount(2);
  }
});
