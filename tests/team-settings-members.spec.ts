import { expect, test } from "@playwright/test";
import { mockGetWorkspaceMembers } from "tests/mocks/utils/mockGetWorkspaceMembers";
import { DEFAULT_WORKSPACE_ID, TEST_USER_PICTURES } from "./mocks/constants";
import { MockData } from "./mocks/types";
import { navigateToPage } from "./utils/navigateToPage";

test("team-settings-members: should group members by role and show pending members", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/members`,
  });

  const roles = page.locator('[data-test-name="TeamMembers-Role"]');
  await expect(roles).toHaveCount(2);

  const admins = page
    .locator('[data-test-id="TeamMembers-Role-Admin"]')
    .locator('[data-test-name="TeamMembers-MemberRow"]');
  await expect(admins).toHaveCount(2);

  const users = page
    .locator('[data-test-id="TeamMembers-Role-User"]')
    .locator('[data-test-name="TeamMembers-MemberRow"]');
  await expect(users).toHaveCount(3);
});

const mockGraphQLData: MockData = {
  GetWorkspaceMembers: mockGetWorkspaceMembers([
    {
      name: "Admin 1",
      picture: TEST_USER_PICTURES.eleanor_diaz,
      roles: ["viewer", "admin"],
    },
    {
      name: "Admin 2",
      roles: ["viewer", "admin"],
    },
    {
      name: "Developer 1",
      roles: ["viewer", "developer"],
    },
    {
      isPending: true,
      name: "Pending developer 1",
      roles: ["viewer", "developer"],
    },
    {
      name: "Developer 2",
      picture: TEST_USER_PICTURES.lewis_neill,
      roles: ["viewer", "developer"],
    },
  ]),
};
