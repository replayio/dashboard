import { expect, test } from "@playwright/test";
import { mockGetTests } from "tests/mocks/utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "tests/mocks/utils/mockGetTestsRunsForWorkspace";
import { partialToTestSuiteTest } from "tests/mocks/utils/partialToTestSuiteTest";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getTestRunSections } from "./utils/getTestRunSections";
import { getTestRunsRow } from "./utils/getTestRunsRow";
import { navigateToPage } from "./utils/navigateToPage";
import { openContextMenu } from "./utils/openContextMenu";
import { waitForUrlChange } from "./utils/waitForUrlChange";

test("test-suites-runs-2: passed run in main branch with source", async ({
  page,
}) => {
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
    expect(text).toContain("Successful run in main branch");

    await expect(
      await page
        .locator('[data-test-id="TestRuns-Stats-FailureRateLabel"]')
        .textContent()
    ).toBe("Failure rate: 0%");

    const column = page.locator('[data-test-name="TestRuns-Stats-DayColumn"]');
    await column.hover();
    const tooltip = page.locator(
      '[data-test-name="TestRuns-Stats-DayColumn-Tooltip"]'
    );

    const tooltipText = await tooltip.textContent();
    await expect(tooltipText).toContain("1 test run passed");
    await expect(tooltipText).toContain("All 2 tests passed");

    await openContextMenu(page, "TestRuns-RunStatusFilter");
    await getContextMenuItem(page, "Only failures").click();
    await expect(rows).toHaveCount(0);

    await openContextMenu(page, "TestRuns-RunStatusFilter");
    await getContextMenuItem(page, "All runs").click();
    await expect(rows).toHaveCount(1);

    const promise = waitForUrlChange(page, await page.url());
    await rows.first().click();
    await promise;
  }

  {
    // Tests (2st column)

    const filters = page.locator('[data-test-id="TestRunTests-Filters"]');
    await expect(
      filters.locator('[data-test-name="TestStatusCapsule-failed"]')
    ).not.toBeVisible();
    await expect(
      filters.locator('[data-test-name="TestStatusCapsule-flaky"]')
    ).not.toBeVisible();
    await expect(
      await filters
        .locator('[data-test-name="TestStatusCapsule-passed"]')
        .textContent()
    ).toBe("2");

    const sections = getTestRunSections(page);
    await expect(sections).toHaveCount(1);
    const passedSection = getTestRunSections(page, "Passed");
    await expect(await passedSection.textContent()).toContain("2 Passed tests");

    // Passed tests should be collapsed by default; expand them
    const rows = page.locator('[data-test-name="TestRunTests-Row"]');
    await expect(rows).toHaveCount(0);
    await sections
      .locator('[data-test-name="ExpandableSection-ToggleButton"]')
      .click();
    await expect(rows).toHaveCount(2);
    await expect(await rows.first().textContent()).toContain("First test");
    await expect(await rows.last().textContent()).toContain("Second test");

    const metadata = page.locator('[data-test-id="TestRunTests-Metadata"]');
    const metadataText = await metadata.textContent();
    expect(metadataText).toContain("test-user-trigger");
    expect(metadataText).toContain("main");
    expect(metadataText).toContain("200.0ms");

    const promise = waitForUrlChange(page, await page.url());
    await rows.first().click();
    await promise;
  }

  {
    // Recordings (3rd column)

    const rows = page.locator('[data-test-name="TestExecution-RecordingRow"]');
    await expect(rows).toHaveCount(1);

    const text = await rows.textContent();
    await expect(text).toContain("View recording");

    const errors = page.locator('[data-test-id="TestExecution-Errors"]');
    await expect(errors).not.toBeVisible();
  }

  {
    // Reloading the page should remember the previous selections
    await page.reload();

    // The same run should be selected by default
    const selectedRunRow = page.locator(
      '[data-test-name="TestRuns-Row"][data-selected]'
    );
    await expect(selectedRunRow).toBeVisible();
    await expect(await selectedRunRow.textContent()).toContain(
      "Successful run in main branch"
    );

    // Passed tests should not be collapsed by default if it contains the selected test
    await expect(
      page.locator('[data-test-name="TestRunTests-Row"]')
    ).toHaveCount(2);

    // The same test should be selected by default
    const selectedTestsRow = page.locator(
      '[data-test-name="TestRunTests-Row"][data-selected]'
    );
    await expect(selectedTestsRow).toBeVisible();
    await expect(await selectedTestsRow.textContent()).toContain("First test");

    await expect(
      page.locator('[data-test-name="TestExecution-RecordingRow"]')
    ).toHaveCount(1);
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
  ]),
  GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace({
    branchName: "main",
    commitTitle: "Successful run in main branch",
    isPrimaryBranch: true,
    numFailed: 0,
    numFlaky: 0,
    numPassed: 2,
    prNumber: null,
    prTitle: null,
    repository: null,
    triggerUrl: "https://fake-trigger-url.com",
    user: "test-user-trigger",
  }),
};
