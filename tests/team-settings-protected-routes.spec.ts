import { expect, test } from "@playwright/test";
import { mockGetUser } from "tests/mocks/utils/mockGetUser";
import { mockGetWorkspaceMembers } from "tests/mocks/utils/mockGetWorkspaceMembers";
import { mockGetWorkspaceSubscription } from "tests/mocks/utils/mockGetWorkspaceSubscription";
import { mockGetWorkspaces } from "tests/mocks/utils/mockGetWorkspaces";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { navigateToPage } from "./utils/navigateToPage";

test("team-settings-protected-routes: should restrict certain routes from non-developer or non-admin roles", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/members`,
  });

  // Protected routes should not be in the left nav

  const links = page.locator('[data-test-name="LeftNavLink"]');
  await expect(links).toHaveCount(3);
  await expect(links.allTextContents()).resolves.toContain("Home");
  await expect(links.allTextContents()).resolves.toContain("My Library");
  await expect(links.allTextContents()).resolves.toContain("Members");

  // Protected routes should not be accessible if directly loaded

  const activeLink = page.locator('[data-test-name="LeftNavLink"][data-is-active="true"]');

  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/api-keys`,
  });
  await expect(activeLink).toContainText("Members");

  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/delete`,
  });
  await expect(activeLink).toContainText("Members");

  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/delete`,
  });
  await expect(activeLink).toContainText("Members");
});

const mockWorkspaceMembers = mockGetWorkspaceMembers([
  {
    roles: ["viewer"],
  },
]);

const mockGraphQLData: MockGraphQLData = {
  GetUser: mockGetUser(),
  GetWorkspaceMembers: mockWorkspaceMembers,
  GetWorkspaceMemberRoles: mockWorkspaceMembers,
  GetWorkspaces: mockGetWorkspaces([{}]),
  GetWorkspaceSubscription: mockGetWorkspaceSubscription({}),
};
