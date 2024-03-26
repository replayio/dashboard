import { expect, test } from "@playwright/test";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getTestRunSections } from "./utils/getTestRunSections";
import { getTestRunsRow } from "./utils/getTestRunsRow";
import { navigateToPage } from "./utils/navigateToPage";
import { openContextMenu } from "./utils/openContextMenu";

test("test-suites-runs-3: failed run in temp branch without source", async ({
  page,
}) => {
  await navigateToPage({
    mockKey: "TEST_RUN_FAILED_PR",
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
      await page
        .locator('[data-test-id="TestRuns-Stats-FailureRateLabel"]')
        .textContent()
    ).toBe("Failure rate: 100%");

    const column = page.locator('[data-test-name="TestRuns-Stats-DayColumn"]');
    await column.hover();
    const tooltip = page.locator(
      '[data-test-name="TestRuns-Stats-DayColumn-Tooltip"]'
    );

    const tooltipText = await tooltip.textContent();
    await expect(tooltipText).toContain("1 test run failed");
    await expect(tooltipText).toContain("2 tests failed out of 9 total tests");

    await openContextMenu(page, "TestRuns-RunStatusFilter");
    await getContextMenuItem(page, "Only failures").click();
    await expect(rows).toHaveCount(1);

    await rows.click();
  }

  {
    // Tests (2st column)

    const filters = page.locator('[data-test-id="TestRunTests-Filters"]');
    await expect(
      await filters
        .locator('[data-test-name="TestStatusCapsule-failed"]')
        .textContent()
    ).toBe("2");
    await expect(
      await filters
        .locator('[data-test-name="TestStatusCapsule-flaky"]')
        .textContent()
    ).toBe("3");
    await expect(
      await filters
        .locator('[data-test-name="TestStatusCapsule-passed"]')
        .textContent()
    ).toBe("4");

    const headers = getTestRunSections(page);
    await expect(headers).toHaveCount(3);

    const failedSection = getTestRunSections(page, "Failed");
    const flakySection = getTestRunSections(page, "Flaky");
    const passedSection = getTestRunSections(page, "Passed");

    await expect(await failedSection.textContent()).toContain("2 Failed tests");
    await expect(await flakySection.textContent()).toContain("3 Flaky tests");
    await expect(await passedSection.textContent()).toContain("4 Passed tests");

    const failedRows = failedSection.locator(
      '[data-test-name="TestRunTests-Row"]'
    );
    const flakyRows = flakySection.locator(
      '[data-test-name="TestRunTests-Row"]'
    );
    const passedRows = passedSection.locator(
      '[data-test-name="TestRunTests-Row"]'
    );

    await expect(failedRows).toHaveCount(2);
    await expect(await failedRows.first().textContent()).toContain(
      "Ninth test"
    );
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

    await flakyRows.first().click();
  }

  {
    // Recordings (3rd column)

    const rows = page.locator('[data-test-name="TestExecution-RecordingRow"]');
    await expect(rows).toHaveCount(2);

    const errors = page.locator('[data-test-id="TestExecution-Errors"]');
    await expect(errors).toBeVisible();
    const errorRows = errors.locator(
      '[data-test-name="TestExecution-Error-Row"]'
    );
    await expect(errorRows).toHaveCount(0);
    await errors
      .locator('[data-test-name="ExpandableSection-ToggleButton"]')
      .click();
    await expect(errorRows).toHaveCount(1);
    await expect(await errorRows.textContent()).toContain(
      "This is an error message"
    );
  }
});
