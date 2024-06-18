import { expect, test } from "@playwright/test";
import { mockGetWorkspaceTestExecutions } from "tests/mocks/utils/mockGetWorkspaceTestExecutions";
import { mockGetWorkspaceTests } from "tests/mocks/utils/mockGetWorkspaceTests";
import { partialToTestSuiteTestExecutionRecording } from "tests/mocks/utils/partialToTestSuiteTestExecutionRecording";
import { submitInputText } from "tests/utils/submitInputText";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { getRecordingRow } from "./utils/getRecordingRow";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";

// TODO [PRO-664] Re-enable this test
test.skip("test-suites-tests-5: should handle when filters hide a selected test", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/tests`,
  });

  const testSummaries = page.locator('[data-test-id="TestSuite-TestSummaries"]');
  const testExecutions = page.locator('[data-test-id="TestSuite-TestExecutions"]');

  const summaryRows = getTestSummaryRow(page);
  const recordingRows = getRecordingRow(page);

  // Confirm 1st column shows list of tests
  // Confirm 2nd column shows selection prompt
  await expect(summaryRows).toHaveCount(2);
  await expect(recordingRows).toHaveCount(0);
  await expect(testExecutions).toContainText("Select test to see details here");

  // Select test
  // Confirm 2nd column shows executions
  await summaryRows.first().click();
  await expect(recordingRows).toHaveCount(2);

  // Change filters so that the selected summary is no longer visible
  // Confirm 1st column shows a list of summaries
  // Confirm 2nd column shows selection prompt
  await submitInputText(page, "Tests-TextFilter", "Second");
  await expect(summaryRows).toHaveCount(1);
  await expect(recordingRows).toHaveCount(0);
  await expect(testExecutions).toContainText("Select test to see details here");

  // Change filters so all summaries are hidden
  // Confirm 1st column shows a filter mismatch warning
  // Confirm 2nd is empty
  await submitInputText(page, "Tests-TextFilter", "NOMATCH");
  await expect(summaryRows).toHaveCount(0);
  await expect(recordingRows).toHaveCount(0);
  await expect(testSummaries).toContainText("No results match the current filters");
  await expect(testExecutions).toContainText("");

  // Remove filters
  // Confirm previous selection is restored
  // Confirm 2nd column shows executions
  await submitInputText(page, "Tests-TextFilter", "");
  await expect(recordingRows).toHaveCount(2);
});

const mockGraphQLData: MockGraphQLData = {
  GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([
    {
      commitTitle: "First",
      recordings: [partialToTestSuiteTestExecutionRecording()],
      status: "failed",
    },
    {
      commitTitle: "Second",
      recordings: [partialToTestSuiteTestExecutionRecording()],
      status: "passed",
    },
  ]),
  GetWorkspaceTests: mockGetWorkspaceTests([
    {
      stats: {
        passed: 2,
      },
      title: "First",
    },
    {
      stats: {
        passed: 2,
      },
      title: "Second",
    },
  ]),
};
