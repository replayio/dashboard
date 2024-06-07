import { expect, test } from "@playwright/test";
import { mockGetWorkspaceMembers } from "tests/mocks/utils/mockGetWorkspaceMembers";
import { DEFAULT_WORKSPACE_ID, TEST_USER_PICTURES } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { navigateToPage } from "./utils/navigateToPage";
import { mockGetWorkspaceMembershipRequests } from "tests/mocks/utils/mockGetWorkspaceMembershipRequests";

test("team-settings-members-pending-access-request: should show users who have requested access to the team", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/members`,
  });

  const admins = page
    .locator('[data-test-name="TeamMembers-MemberRow"]')
    .locator('[data-test-name="TeamMembers-Role-Admin"]');
  await expect(admins).toHaveCount(1);

  const requested = page
    .locator('[data-test-name="TeamMembers-MemberRow"]')
    .locator('[data-test-name="TeamMembers-RequestedAccess"]');
  await expect(requested).toHaveCount(1);
});

const mockGraphQLData: MockGraphQLData = {
  GetWorkspaceMembers: mockGetWorkspaceMembers([
    {
      name: "Admin",
      picture: TEST_USER_PICTURES.eleanor_diaz,
      roles: ["admin", "debugger"],
    },
  ]),
  GetWorkspaceMembershipRequests: mockGetWorkspaceMembershipRequests([
    {
      name: "Lewis",
      picture: TEST_USER_PICTURES.lewis_neill,
    },
  ]),
};
