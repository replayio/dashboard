import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { mockGetWorkspace } from "tests/mocks/utils/mockGetWorkspace";
import { mockGetWorkspaceTestExecutions } from "tests/mocks/utils/mockGetWorkspaceTestExecutions";
import { mockGetWorkspaceTests } from "tests/mocks/utils/mockGetWorkspaceTests";
import { partialToTestSuiteTestExecutionRecording } from "tests/mocks/utils/partialToTestSuiteTestExecutionRecording";
import { getContextMenuItem } from "tests/utils/getContextMenuItem";
import { openContextMenu } from "tests/utils/openContextMenu";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { getRecordingRow } from "./utils/getRecordingRow";
import { getTestExecutionRow } from "./utils/getTestExecutionRow";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-tests-4: should respect workspace retention limits", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/tests`,
  });

  const summaryRows = getTestSummaryRow(page);
  await expect(summaryRows).toHaveCount(1);
  await summaryRows.click();

  const executionRows = getTestExecutionRow(page);
  const recordingRows = getRecordingRow(page, { isWithinRetentionLimit: true });
  const retentionMessage = page.locator('[data-test-name="TestExecution-RetentionMessage"]');

  // The past week has 1 test execution with 1 recording
  await expect(executionRows).toHaveCount(1);
  await expect(recordingRows).toHaveCount(1);
  await expect(retentionMessage).not.toBeVisible();

  await openContextMenu(page, "Tests-DateRangeFilter");
  await getContextMenuItem(page, "Past 2 weeks").click();

  // The past 2 weeks has 2 test executions with 2 recordings
  // It also shows a warning about results that are potentially not included
  await expect(executionRows).toHaveCount(2);
  await expect(recordingRows).toHaveCount(2);
  await expect(retentionMessage).toBeVisible();

  await openContextMenu(page, "Tests-DateRangeFilter");
  await getContextMenuItem(page, "Past month").click();

  // The past month has 3 test executions with 2 recordings
  // It also shows a warning about results that are potentially not included
  await expect(executionRows).toHaveCount(3);
  await expect(recordingRows).toHaveCount(2);
  await expect(getRecordingRow(page, { isWithinRetentionLimit: false })).toHaveCount(1);

  await expect(retentionMessage).toBeVisible();
});

const mockGraphQLData: MockGraphQLData = {
  GetWorkspace: mockGetWorkspace({
    retentionLimitDays: 7,
  }),
  GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([
    {
      commitTitle: "5 day old commit",
      createdAt: getRelativeDate({ daysAgo: 5 }),
      recordings: [
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ daysAgo: 5 }),
        }),
      ],
      status: "passed",
    },
    {
      commitTitle: "10 day old commit",
      createdAt: getRelativeDate({ daysAgo: 10 }),
      recordings: [
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ daysAgo: 10 }),
        }),
      ],
      status: "passed",
    },
    {
      commitTitle: "20 day old commit",
      createdAt: getRelativeDate({ daysAgo: 20 }),
      recordings: [
        partialToTestSuiteTestExecutionRecording({
          createdAt: getRelativeDate({ daysAgo: 20 }),
        }),
      ],
      status: "passed",
    },
  ]),
  GetWorkspaceTests: mockGetWorkspaceTests([
    {
      stats: {
        passed: 3,
      },
      title: "Passing test",
    },
  ]),
};
