import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { MockGraphQLData } from "tests/mocks/types";
import { mockGetTests } from "tests/mocks/utils/mockGetTests";
import { mockGetTestsRunsForWorkspace } from "tests/mocks/utils/mockGetTestsRunsForWorkspace";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { navigateToPage } from "./utils/navigateToPage";

test("test-suites-runs-6: should show a warning when a user opens a URL linking to a test run that could not be loaded", async ({
  page,
}) => {
  const warningDialog = page.locator('[data-test-id="DeepLinkWarningDialog"]');

  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/runs?testRunId=NOMATCH`,
  });

  // Load the page and check if the warning is displayed
  await expect(warningDialog).toBeVisible();

  // Dismiss the warning and confirm the expected prompts/data are displayed
  await page.locator('[data-test-nam="ModalDialog-CloseButton"]').click();
  await expect(warningDialog).not.toBeVisible();
  await expect(page.locator('[data-test-name="TestRuns-Row"]')).toHaveCount(1);
});

const mockGraphQLData: MockGraphQLData = {
  GetTests: mockGetTests([]),
  GetTestsRunsForWorkspace: mockGetTestsRunsForWorkspace([
    {
      date: getRelativeDate({ daysAgo: 5 }),
      commitTitle: "Test run",
    },
  ]),
};
