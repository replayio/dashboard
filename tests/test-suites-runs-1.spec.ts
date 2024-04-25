import { expect, test } from "@playwright/test";
import { MockGraphQLData } from "tests/mocks/types";
import { mockGetTests } from "tests/mocks/utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "tests/mocks/utils/mockGetTestsRunsForWorkspace";
import { partialToTestSuiteTest } from "tests/mocks/utils/partialToTestSuiteTest";
import { partialToTestSuiteTestRecording } from "tests/mocks/utils/partialToTestSuiteTestRecording";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getContextMenuText } from "./utils/getContextMenuText";
import { getLeftNavLink } from "./utils/getLeftNavLink";
import { navigateToPage } from "./utils/navigateToPage";
import { openContextMenu } from "./utils/openContextMenu";
import { submitInputText } from "./utils/submitInputText";

test("test-suites-runs-1: text and drop-down filters", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs`,
  });

  // Verify the test suite route has loaded based on the left-nav links
  await expect(await getLeftNavLink(page, "Runs")).toBeVisible();
  await expect(await getLeftNavLink(page, "Tests")).toBeVisible();
  await expect(await getLeftNavLink(page, "Settings")).toBeVisible();

  const testRunsRows = page.locator('[data-test-name="TestRuns-Row"]');
  const testRunRows = page.locator('[data-test-name="TestRunTests-Row"]');

  // Select a random test run and test
  await expect(testRunRows).toHaveCount(0);
  await testRunsRows.first().click();
  await expect(testRunRows).not.toHaveCount(0);
  await expect(page.locator('[data-test-id="TestExecution-Recordings"]')).not.toBeVisible();
  await testRunRows.first().click();
  await expect(page.locator('[data-test-id="TestExecution-Recordings"]')).toBeVisible();

  // Should filter tests by text
  await expect(testRunRows).not.toHaveCount(0);
  await submitInputText(page, "TestRun-TextFilter", "nothing-will-match-this");
  await expect(testRunRows).toHaveCount(0);
  await submitInputText(page, "TestRun-TextFilter", "");
  await expect(testRunRows).not.toHaveCount(0);

  // It's difficult to test drop-down filters because content is dynamic
  // but we can test that their most recent state is remembered after reloading the page
  await expect(await getContextMenuText(page, "TestRun-StatusFilter")).toBe("All runs");
  await openContextMenu(page, "TestRun-StatusFilter");
  await getContextMenuItem(page, "Failed and flaky").click();
  await page.reload();
  await testRunsRows.first().click();
  await expect(await getContextMenuText(page, "TestRun-StatusFilter")).toBe("Failed and flaky");

  // Should filter test runs by text
  await expect(testRunsRows).not.toHaveCount(0);
  await submitInputText(page, "TestRuns-TextFilter", "nothing-will-match-this");
  await expect(testRunsRows).toHaveCount(0);
  await submitInputText(page, "TestRuns-TextFilter", "");
  await expect(testRunsRows).not.toHaveCount(0);

  // It's difficult to test drop-down filters because content is dynamic
  // but we can test that their most recent state is remembered after reloading the page
  await expect(await getContextMenuText(page, "TestRuns-RunStatusFilter")).toBe("All runs");
  await expect(await getContextMenuText(page, "TestRuns-DateRangeFilter")).toBe("Last 7 days");
  await expect(await getContextMenuText(page, "TestRuns-BranchFilter")).toBe("All branches");
  await openContextMenu(page, "TestRuns-RunStatusFilter");
  await getContextMenuItem(page, "Only failures").click();
  await openContextMenu(page, "TestRuns-DateRangeFilter");
  await getContextMenuItem(page, "Last day").click();
  await openContextMenu(page, "TestRuns-BranchFilter");
  await getContextMenuItem(page, "Only primary branch").click();
  await page.reload();
  await expect(await getContextMenuText(page, "TestRuns-RunStatusFilter")).toBe("Only failures");
  await expect(await getContextMenuText(page, "TestRuns-DateRangeFilter")).toBe("Last day");
  await expect(await getContextMenuText(page, "TestRuns-BranchFilter")).toBe("Only primary branch");
});

const mockGraphQLData: MockGraphQLData = {
  GetTests: mockGetTests([
    partialToTestSuiteTest({
      sourcePath: undefined,
      status: "passed",
      title: "First test",
    }),
    partialToTestSuiteTest({
      sourcePath: undefined,
      status: "passed",
      title: "Second test",
    }),
    partialToTestSuiteTest({
      sourcePath: undefined,
      status: "passed",
      title: "Third test",
    }),
    partialToTestSuiteTest({
      errors: ["This is an error message"],
      executions: [
        {
          recordings: [partialToTestSuiteTestRecording(), partialToTestSuiteTestRecording()],
        },
      ],
      sourcePath: undefined,
      status: "flaky",
      title: "Fourth test",
    }),
    partialToTestSuiteTest({
      errors: ["This is an error message"],
      executions: [
        {
          recordings: [partialToTestSuiteTestRecording(), partialToTestSuiteTestRecording()],
        },
      ],
      sourcePath: undefined,
      status: "flaky",
      title: "Fifth test",
    }),
    partialToTestSuiteTest({
      errors: ["This is an error message"],
      sourcePath: undefined,
      status: "failed",
      title: "Sixth test",
    }),
    partialToTestSuiteTest({
      sourcePath: undefined,
      status: "passed",
      title: "Seventh test",
    }),
    partialToTestSuiteTest({
      errors: ["This is an error message"],
      executions: [
        {
          recordings: [partialToTestSuiteTestRecording(), partialToTestSuiteTestRecording()],
        },
      ],
      sourcePath: undefined,
      status: "flaky",
      title: "Eighth test",
    }),
    partialToTestSuiteTest({
      errors: ["This is an error message"],
      sourcePath: undefined,
      status: "failed",
      title: "Ninth test",
    }),
  ]),
  GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace({
    branchName: "temp",
    commitTitle: "Failed run in temp branch",
    isPrimaryBranch: false,
    numFailed: 2,
    numFlaky: 3,
    numPassed: 4,
    prNumber: 123,
    prTitle: "Pull Request Title",
    repository: null,
    triggerUrl: "https://fake-trigger-url.com",
    user: null,
  }),
};
