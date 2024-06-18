import { expect, test } from "@playwright/test";
import { mockGetWorkspaceTestExecutions } from "tests/mocks/utils/mockGetWorkspaceTestExecutions";
import { mockGetWorkspaceTests } from "tests/mocks/utils/mockGetWorkspaceTests";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { getTestSummaryRow } from "./utils/getTestSummaryRow";
import { navigateToPage } from "./utils/navigateToPage";

// TODO [PRO-664] Re-enable this test
test.skip("test-suites-tests-6: should show a warning when a user opens a URL linking to a test that could not be loaded", async ({
  page,
}) => {
  const warningDialog = page.locator('[data-test-id="DeepLinkWarningDialog"]');

  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/tests?testSummaryId=NOMATCH`,
  });

  // Load the page and check if the warning is displayed
  await expect(warningDialog).toBeVisible();

  // Dismiss the warning and confirm the expected prompts/data are displayed
  await page.locator('[data-test-nam="ModalDialog-CloseButton"]').click();
  await expect(warningDialog).not.toBeVisible();
  await expect(getTestSummaryRow(page)).toHaveCount(1);
});

const mockGraphQLData: MockGraphQLData = {
  GetWorkspaceTestExecutions: mockGetWorkspaceTestExecutions([]),
  GetWorkspaceTests: mockGetWorkspaceTests([
    {
      title: "Test",
    },
  ]),
};
