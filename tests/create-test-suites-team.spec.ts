import { Page, expect, test } from "@playwright/test";
import { MockGraphQLData } from "tests/mocks/types";
import { getUID } from "tests/mocks/utils/getUID";
import { mockCreateNewWorkspace } from "tests/mocks/utils/mockCreateNewWorkspace";
import { mockCreateWorkspaceAPIKey } from "tests/mocks/utils/mockCreateWorkspaceAPIKey";
import { mockGetUser } from "tests/mocks/utils/mockGetUser";
import { mockGetWorkspace } from "tests/mocks/utils/mockGetWorkspace";
import { mockGetWorkspaces } from "tests/mocks/utils/mockGetWorkspaces";
import { mockWorkspaceRecordings } from "tests/mocks/utils/mockWorkspaceRecordings";
import { getLeftNavLink } from "tests/utils/getLeftNavLink";
import { navigateToPage } from "./utils/navigateToPage";
import { waitUntil } from "tests/utils/waitUntil";

test("create-test-suites-team: create a test suites workspace", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: "/team/new/tests",
  });

  const form = page.locator('[data-test-id="CreateTestSuitesTeam"]');
  const continueButton = page.locator('[data-test-id="CreateTeam-Continue-Button"]');

  await expect(continueButton.isEnabled()).resolves.toBeFalsy();

  {
    // Step 1: Team name, test runner, and package manager

    await waitUntilTestFormStep(page, 1);

    await page.locator('[data-test-id="CreateTestSuiteTeam-TeamName-Input"]').fill("Example");
    await page
      .locator('[data-test-id="CreateTestSuiteTeam-TestRunner-Select"]')
      .selectOption({ label: "Cypress" });
    await page
      .locator('[data-test-id="CreateTestSuiteTeam-PackageManager-Select"]')
      .selectOption({ label: "pnpm" });

    await expect(continueButton.isEnabled()).resolves.toBeTruthy();
    await continueButton.click();
  }

  {
    // Step 2: Test runner configuration

    await waitUntilTestFormStep(page, 2);

    await expect(form.textContent()).resolves.toContain("pnpm add --save-dev @replayio/cypress");

    await continueButton.click();
  }

  {
    // Step 3: Confirmation

    await waitUntilTestFormStep(page, 3);

    await expect(form.textContent()).resolves.toContain(
      "npx cypress run --browser replay-chromium"
    );

    await expect(continueButton.isEnabled()).resolves.toBeTruthy();
    await continueButton.click();
  }

  {
    // Users should be able to return to step 2 if they want to review the form

    const backButton = page.locator('[data-test-id="CreateTeam-Back-Button"]');
    await expect(backButton.isEnabled()).resolves.toBeTruthy();
    await backButton.click();

    await waitUntilTestFormStep(page, 2);

    await expect(continueButton.isEnabled()).resolves.toBeTruthy();
    await continueButton.click();

    await waitUntilTestFormStep(page, 3);
  }

  {
    // Continue to new workspace

    await expect(getLeftNavLink(page, "Runs").getAttribute("data-is-active")).resolves.toBe("true");
    await expect(getLeftNavLink(page, "Tests").getAttribute("data-is-active")).resolves.toBeNull();
  }
});

const teamId = getUID("test-suite-team");

const mockGraphQLData: MockGraphQLData = {
  CreateNewWorkspace: mockCreateNewWorkspace({
    id: teamId,
  }),
  CreateWorkspaceAPIKey: mockCreateWorkspaceAPIKey(),
  GetUser: mockGetUser(),
  GetWorkspace: mockGetWorkspace({
    id: teamId,
    isTest: true,
    name: "Example",
  }),
  GetWorkspaceRecordings: mockWorkspaceRecordings(),
  GetWorkspaces: mockGetWorkspaces([
    {
      id: teamId,
      isTest: true,
      name: "Example",
    },
  ]),
};

export async function waitUntilTestFormStep(page: Page, currentStep: number) {
  const multiStepForm = page.locator('[data-test-name="MultiStepForm"]');
  const step1 = multiStepForm.locator('[data-test-name="MultiStepForm-Step-1"]');
  const step2 = multiStepForm.locator('[data-test-name="MultiStepForm-Step-2"]');
  const step3 = multiStepForm.locator('[data-test-name="MultiStepForm-Step-3"]');

  await waitUntil(
    async () => {
      switch (currentStep) {
        case 1: {
          await expect(step1.getAttribute("data-test-state")).resolves.toBe("current");
          await expect(step2.getAttribute("data-test-state")).resolves.toBe("incomplete");
          await expect(step3.getAttribute("data-test-state")).resolves.toBe("incomplete");
          break;
        }
        case 2: {
          await expect(step1.getAttribute("data-test-state")).resolves.toBe("complete");
          await expect(step2.getAttribute("data-test-state")).resolves.toBe("current");
          await expect(step3.getAttribute("data-test-state")).resolves.toBe("incomplete");
          break;
        }
        case 3: {
          await expect(step1.getAttribute("data-test-state")).resolves.toBe("complete");
          await expect(step2.getAttribute("data-test-state")).resolves.toBe("complete");
          await expect(step3.getAttribute("data-test-state")).resolves.toBe("current");
          break;
        }
      }
    },
    {
      message: `Waiting for test step ${currentStep}`,
    }
  );
}
