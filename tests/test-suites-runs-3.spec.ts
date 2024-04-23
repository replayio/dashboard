import { expect, test } from "@playwright/test";
import { mockGetTests } from "tests/mocks/utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "tests/mocks/utils/mockGetTestsRunsForWorkspace";
import { partialToTestSuiteTest } from "tests/mocks/utils/partialToTestSuiteTest";
import { partialToTestSuiteTestRecording } from "tests/mocks/utils/partialToTestSuiteTestRecording";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getTestRunSections } from "./utils/getTestRunSections";
import { getTestRunsRow } from "./utils/getTestRunsRow";
import { navigateToPage } from "./utils/navigateToPage";
import { openContextMenu } from "./utils/openContextMenu";
import { waitForUrlChange } from "./utils/waitForUrlChange";

test("test-suites-runs-3: failed run in temp branch without source", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs`,
  });

  {
    // Test runs (1st column)

    const rows = getTestRunsRow(page);
    await expect(rows).toHaveCount(1);

    const text = await rows.textContent();
    expect(text).toContain("Failed run in temp branch");

    await expect(
      await page.locator('[data-test-id="TestRuns-Stats-FailureRateLabel"]').textContent()
    ).toBe("Failure rate: 100%");

    const column = page.locator('[data-test-name="TestRuns-Stats-DayColumn"]');
    await column.hover();
    const tooltip = page.locator('[data-test-name="TestRuns-Stats-DayColumn-Tooltip"]');

    const tooltipText = await tooltip.textContent();
    await expect(tooltipText).toContain("1 test run failed");
    await expect(tooltipText).toContain("2 tests failed out of 9 total tests");

    await openContextMenu(page, "TestRuns-RunStatusFilter");
    await getContextMenuItem(page, "Only failures").click();
    await expect(rows).toHaveCount(1);

    const promise = waitForUrlChange(page, await page.url());
    await rows.first().click();
    await promise;
  }

  {
    // Tests (2st column)

    const filters = page.locator('[data-test-id="TestRunTests-Filters"]');
    await expect(
      await filters.locator('[data-test-name="TestStatusCapsule-failed"]').textContent()
    ).toBe("2");
    await expect(
      await filters.locator('[data-test-name="TestStatusCapsule-flaky"]').textContent()
    ).toBe("3");
    await expect(
      await filters.locator('[data-test-name="TestStatusCapsule-passed"]').textContent()
    ).toBe("4");

    const headers = getTestRunSections(page);
    await expect(headers).toHaveCount(3);

    const failedSection = getTestRunSections(page, "Failed");
    const flakySection = getTestRunSections(page, "Flaky");
    const passedSection = getTestRunSections(page, "Passed");

    await expect(await failedSection.textContent()).toContain("2 Failed tests");
    await expect(await flakySection.textContent()).toContain("3 Flaky tests");
    await expect(await passedSection.textContent()).toContain("4 Passed tests");

    const failedRows = failedSection.locator('[data-test-name="TestRunTests-Row"]');
    const flakyRows = flakySection.locator('[data-test-name="TestRunTests-Row"]');
    const passedRows = passedSection.locator('[data-test-name="TestRunTests-Row"]');

    await expect(failedRows).toHaveCount(2);
    await expect(await failedRows.first().textContent()).toContain("Ninth test");
    await expect(await failedRows.last().textContent()).toContain("Sixth test");

    await expect(flakyRows).toHaveCount(3);
    await expect(await flakyRows.nth(0).textContent()).toContain("Eighth test");
    await expect(await flakyRows.nth(1).textContent()).toContain("Fifth test");
    await expect(await flakyRows.nth(2).textContent()).toContain("Fourth test");

    // Passing tests section is collapsed by default
    await expect(passedRows).toHaveCount(0);

    const metadata = page.locator('[data-test-id="TestRunTests-Metadata"]');
    const metadataText = await metadata.textContent();
    expect(metadataText).toContain("temp");
    expect(metadataText).toContain("900.0ms");

    await openContextMenu(page, "TestRun-StatusFilter");
    await getContextMenuItem(page, "Failed and flaky").click();
    await expect(passedSection).not.toBeVisible();

    await openContextMenu(page, "TestRun-StatusFilter");
    await getContextMenuItem(page, "All runs").click();
    await expect(passedSection).toBeVisible();

    const promise = waitForUrlChange(page, await page.url());
    await flakyRows.first().click();
    await promise;
  }

  {
    // Recordings (3rd column)

    const rows = page.locator('[data-test-name="TestExecution-RecordingRow"]');
    await expect(rows).toHaveCount(2);

    const errors = page.locator('[data-test-id="TestExecution-Errors"]');
    await expect(errors).toBeVisible();
    const errorRows = errors.locator('[data-test-name="TestExecution-Error-Row"]');
    await expect(errorRows).toHaveCount(0);
    await errors.locator('[data-test-name="ExpandableSection-ToggleButton"]').click();
    await expect(errorRows).toHaveCount(1);
    await expect(await errorRows.textContent()).toContain("This is an error message");
  }

  {
    // Reloading the page should remember the previous selections
    await page.reload();

    // The same run should be selected by default
    const selectedRunRow = page.locator('[data-test-name="TestRuns-Row"][data-selected]');
    await expect(selectedRunRow).toBeVisible();
    await expect(await selectedRunRow.textContent()).toContain("Failed run in temp branch");

    // The same test should be selected by default
    const selectedTestsRow = page.locator('[data-test-name="TestRunTests-Row"][data-selected]');
    await expect(selectedTestsRow).toBeVisible();
    await expect(await selectedTestsRow.textContent()).toContain("Eighth test");

    await expect(page.locator('[data-test-name="TestExecution-RecordingRow"]')).toHaveCount(2);
    await expect(page.locator('[data-test-id="TestExecution-Errors"]')).toBeVisible();
  }
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
      recordings: [partialToTestSuiteTestRecording(), partialToTestSuiteTestRecording()],
      sourcePath: undefined,
      status: "flaky",
      title: "Fourth test",
    }),
    partialToTestSuiteTest({
      errors: ["This is an error message"],
      recordings: [partialToTestSuiteTestRecording(), partialToTestSuiteTestRecording()],
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
      recordings: [partialToTestSuiteTestRecording(), partialToTestSuiteTestRecording()],
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
