import { expect, test } from "@playwright/test";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MOCK_DATA } from "./mocks/data";
import { navigateToPage } from "./utils/navigateToPage";

test("team-settings-members: should group members by role and show pending members", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData: MOCK_DATA.TEAM_SETTINGS_MEMBERS,
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
