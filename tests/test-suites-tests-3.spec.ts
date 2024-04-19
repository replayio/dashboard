import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { mockGetWorkspaceTestExecutions } from "tests/mocks/utils/mockGetWorkspaceTestExecutions";
import { mockGetWorkspaceTests } from "tests/mocks/utils/mockGetWorkspaceTests";
import { partialToTestSuiteTestExecutionRecording } from "tests/mocks/utils/partialToTestSuiteTestExecutionRecording";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockData } from "./mocks/types";
import { getRecordingRow } from "./utils/getRecordingRow";
import { getTestExecutionRow } from "./utils/getTestExecutionRow";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-tests-3: flaky test executions", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData,
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

const mockGraphQLData: MockData = {
  GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([
    {
      commitTitle: "Commit with 3 flaky tests",
      recordings: [
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ minutesAgo: 1 }),
        }),
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ minutesAgo: 2 }),
          isProcessed: true,
        }),
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ minutesAgo: 3 }),
          isProcessed: true,
        }),
      ],
      result: "flaky",
    },
    {
      commitTitle: "Commit with 2 flaky tests",
      recordings: [
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ minutesAgo: 2 }),
          isProcessed: true,
        }),
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ minutesAgo: 1 }),
        }),
      ],
      result: "flaky",
    },
  ]),
  GetWorkspaceTests: mockGetWorkspaceTests([
    {
      stats: {
        flaky: 2,
        flakyRate: 1,
      },
      title: "Flaky test run",
    },
  ]),
};
