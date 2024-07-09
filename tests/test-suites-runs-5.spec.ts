import { expect, test } from "@playwright/test";
import { MockGraphQLData } from "tests/mocks/types";
import { mockGetTests } from "tests/mocks/utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "tests/mocks/utils/mockGetTestsRunsForWorkspace";
import { partialToTestSuiteTest } from "tests/mocks/utils/partialToTestSuiteTest";
import { submitInputText } from "tests/utils/submitInputText";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-runs-5: should handle when filters hide a selected test run or test", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs`,
  });

  const testRuns = page.locator('[data-test-id="TestSuite-TestRuns"]');
  const testRunDetails = page.locator('[data-test-id="TestSuite-TestRunDetails"]');
  const testDetails = page.locator('[data-test-id="TestSuite-TestDetails"]');

  {
    // Confirm 2nd column shows selection prompt and 3rd column is empty
    await expect(testRunDetails).toContainText("Select a run to see its details here");
    await expect(testDetails).toBeEmpty();

    // Select test run
    // Confirm 2nd column shows tests and 3rd column shows selection prompt
    const testRunsRows = page.locator('[data-test-name="TestRuns-Row"]');
    await expect(testRunsRows).toHaveCount(2);
    await testRunsRows.first().click();
    await expect(testRunDetails).toContainText("First test");
    await expect(testRunDetails).toContainText("Second test");
    await expect(testDetails).toContainText("Select a test to see its details here");

    // Change filters so that the selected test is no longer visible
    // Confirm 1st column shows a filter mismatch warning
    // Confirm 2nd and 3rd columns are empty
    await submitInputText(page, "TestRuns-TextFilter", "Second");
    await expect(testRunsRows).toHaveCount(1);
    await expect(testRunDetails).toContainText("Select a run to see its details here");
    await expect(testDetails).toBeEmpty();

    // Change filters so that the no test runs are visible
    // Confirm 1st column shows a filter mismatch warning
    // Confirm 2nd and 3rd columns are empty
    await submitInputText(page, "TestRuns-TextFilter", "NOMATCH");
    await expect(testRuns).toContainText("No test runs match the current filters");
    await expect(testRunDetails).toBeEmpty();
    await expect(testDetails).toBeEmpty();

    // Remove filters
    // Confirm previous selection is restored
    // Confirm 2nd column shows selection prompt
    await submitInputText(page, "TestRuns-TextFilter", "");
    await expect(testRunsRows).toHaveCount(2);
    await expect(testRunDetails).toContainText("First test");
    await expect(testRunDetails).toContainText("Second test");
  }

  {
    // Confirm 3rd column default message
    await expect(testDetails).toContainText("Select a test to see its details here");

    // Select test and confirm 3rd column tests
    const testRunRows = page.locator('[data-test-name="TestRunTests-Row"]');
    expect(testRunRows).toHaveCount(2);
    await testRunRows.first().click();
    await expect(testDetails).toContainText("View replay");

    // Change filters so that it's hidden and confirm 3rd column message
    await submitInputText(page, "TestRun-TextFilter", "Second");
    expect(testRunRows).toHaveCount(1);
    await expect(testDetails).toContainText("Select a test to see its details here");

    // Change filters so that the no tests are visible
    // Confirm 1st column shows a filter mismatch warning
    // Confirm 2nd and 3rd columns are empty
    await submitInputText(page, "TestRun-TextFilter", "NOMATCH");
    await expect(testRunDetails).toContainText("No tests match the current filters.");
    await expect(testDetails).toBeEmpty();

    // Remove filters
    // Confirm previous selection is restored
    await submitInputText(page, "TestRun-TextFilter", "");
    expect(testRunRows).toHaveCount(2);
    await expect(testDetails).toContainText("View replay");
  }
});

const mockGraphQLData: MockGraphQLData = {
  GetTests: mockGetTests([
    partialToTestSuiteTest({
      status: "failed",
      title: "First test",
    }),
    partialToTestSuiteTest({
      status: "failed",
      title: "Second test",
    }),
  ]),
  GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace([
    {
      commitTitle: "First test run",
      numFailed: 2,
    },
    {
      commitTitle: "Second test run",
      numFailed: 2,
    },
  ]),
};
