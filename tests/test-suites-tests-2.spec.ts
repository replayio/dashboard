import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { mockGetWorkspaceTestExecutions } from "tests/mocks/utils/mockGetWorkspaceTestExecutions";
import { mockGetWorkspaceTests } from "tests/mocks/utils/mockGetWorkspaceTests";
import { partialToTestSuiteTestExecutionRecording } from "tests/mocks/utils/partialToTestSuiteTestExecutionRecording";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { getRecordingRow } from "./utils/getRecordingRow";
import { getTestExecutionRow } from "./utils/getTestExecutionRow";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-tests-2: failed test executions", async ({ page }) => {
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
    await expect(recordingRows).toHaveCount(3);

    const executionRows = getTestExecutionRow(page);
    await expect(executionRows).toHaveCount(2);
    const textContents = await Promise.all([
      executionRows.nth(0).textContent(),
      executionRows.nth(1).textContent(),
    ]);
    expect(
      textContents.find(text => text?.includes("Commit with 2 failed tests"))
    ).not.toBeUndefined();
    expect(
      textContents.find(text => text?.includes("Commit with 1 passing test"))
    ).not.toBeUndefined();
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

const mockGraphQLData: MockGraphQLData = {
  GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([
    {
      commitTitle: "Commit with 2 failed tests",
      recordings: [
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ minutesAgo: 2 }),
          isProcessed: true,
        }),
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ minutesAgo: 1 }),
          isProcessed: true,
        }),
      ],
      status: "failed",
    },
    {
      commitTitle: "Commit with 1 passing test",
      recordings: [partialToTestSuiteTestExecutionRecording()],
      status: "passed",
    },
  ]),
  GetWorkspaceTests: mockGetWorkspaceTests([
    {
      stats: {
        failed: 1,
        failureRate: 0.5,
        passed: 1,
      },
      title: "Failed test",
    },
  ]),
};
