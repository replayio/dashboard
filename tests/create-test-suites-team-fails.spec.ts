import { expect, test } from "@playwright/test";
import { MockGraphQLData } from "tests/mocks/types";
import { createApolloError } from "tests/mocks/utils/createApolloError";
import { mockCreateWorkspaceAPIKey } from "tests/mocks/utils/mockCreateWorkspaceAPIKey";
import { mockGetUser } from "tests/mocks/utils/mockGetUser";
import { mockWorkspaceRecordings } from "tests/mocks/utils/mockWorkspaceRecordings";
import { navigateToPage } from "./utils/navigateToPage";

test("create-test-suites-team-fails: shows mutation error message", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: "/team/new/tests",
  });

  const continueButton = page.locator('[data-test-id="CreateTeam-Continue-Button"]');
  const goBackButton = page.locator('[data-test-id="CreateTeam-GoBack-Button"]');

  await expect(goBackButton).not.toBeVisible();
  await expect(continueButton.isEnabled()).resolves.toBeFalsy();

  {
    // Step 1: Team name, test runner, and package manager

    await page.locator('[data-test-id="CreateTestSuiteTeam-TeamName-Input"]').fill("Example");
    await page
      .locator('[data-test-id="CreateTestSuiteTeam-TestRunner-Select"]')
      .selectOption({ label: "Playwright" });
    await page
      .locator('[data-test-id="CreateTestSuiteTeam-PackageManager-Select"]')
      .selectOption({ label: "pnpm" });

    await expect(continueButton.isEnabled()).resolves.toBeTruthy();
    await continueButton.click();

    const error = page.locator('[data-test-id="CreateTeam-Error"]');
    await expect(error.textContent()).resolves.toContain("Failed to create workspace");
  }
});

const mockGraphQLData: MockGraphQLData = {
  CreateNewWorkspace: {
    error: createApolloError("Failed to create workspace"),
  },
  CreateWorkspaceAPIKey: mockCreateWorkspaceAPIKey(),
  GetUser: mockGetUser(),
  GetWorkspaceRecordings: mockWorkspaceRecordings(),
};
