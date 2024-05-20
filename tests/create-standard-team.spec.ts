import { expect, test } from "@playwright/test";
import { MockGraphQLData } from "tests/mocks/types";
import { mockCreateNewWorkspace } from "tests/mocks/utils/mockCreateNewWorkspace";
import { mockCreateWorkspaceAPIKey } from "tests/mocks/utils/mockCreateWorkspaceAPIKey";
import { mockGetUser } from "tests/mocks/utils/mockGetUser";
import { mockGetWorkspace } from "tests/mocks/utils/mockGetWorkspace";
import { mockGetWorkspaces } from "tests/mocks/utils/mockGetWorkspaces";
import { mockWorkspaceRecordings } from "tests/mocks/utils/mockWorkspaceRecordings";
import { getLeftNavLink } from "tests/utils/getLeftNavLink";
import { navigateToPage } from "./utils/navigateToPage";

test("create-standard-team: create a standard workspace for debugging", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: "/team/new/standard",
  });

  const button = page.locator('[data-test-id="CreateTeam-Submit-Button"]');
  await expect(button.isEnabled()).resolves.toBeFalsy();

  const input = page.locator('[data-test-id="CreateTeam-TeamName-Input"]');
  await input.fill("Example");

  await expect(button.isEnabled()).resolves.toBeTruthy();
  await button.click();

  const link = getLeftNavLink(page, "Recordings");
  await expect(link.getAttribute("data-is-active")).resolves.toBe("true");
});

const mockGraphQLData: MockGraphQLData = {
  CreateNewWorkspace: mockCreateNewWorkspace({
    id: "new",
  }),
  CreateWorkspaceAPIKey: mockCreateWorkspaceAPIKey(),
  GetUser: mockGetUser(),
  GetWorkspace: mockGetWorkspace({
    id: "new",
    isTest: false,
    name: "Example",
  }),
  GetWorkspaceRecordings: mockWorkspaceRecordings(),
  GetWorkspaces: mockGetWorkspaces([
    {
      id: "new",
      isTest: false,
      name: "Example",
    },
  ]),
};
