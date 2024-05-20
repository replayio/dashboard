import { expect, test } from "@playwright/test";
import { mockGetWorkspaceMembers } from "tests/mocks/utils/mockGetWorkspaceMembers";
import { DEFAULT_WORKSPACE_ID, TEST_USER_PICTURES } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { navigateToPage } from "./utils/navigateToPage";

test("team-settings-members: should label member roles", async ({ page }) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/members`,
  });

  const admins = page
    .locator('[data-test-name="TeamMembers-MemberRow"]')
    .locator('[data-test-name="TeamMembers-Role-Admin"]');
  await expect(admins).toHaveCount(2);

  const developers = page
    .locator('[data-test-name="TeamMembers-MemberRow"]')
    .locator('[data-test-name="TeamMembers-Role-Developer"]');
  await expect(developers).toHaveCount(2);

  const viewers = page
    .locator('[data-test-name="TeamMembers-MemberRow"]')
    .locator('[data-test-name="TeamMembers-Role-Viewer"]');
  await expect(viewers).toHaveCount(2);
});

const mockGraphQLData: MockGraphQLData = {
  GetWorkspaceMembers: mockGetWorkspaceMembers([
    {
      name: "Admin 1",
      picture: TEST_USER_PICTURES.eleanor_diaz,
      roles: ["admin", "debugger"],
    },
    {
      name: "Admin 2",
      roles: ["admin", "viewer"],
    },
    {
      name: "Developer 1",
      roles: ["debugger"],
    },
    {
      name: "Viewer 2",
      picture: TEST_USER_PICTURES.lewis_neill,
      roles: ["viewer"],
    },
  ]),
};
