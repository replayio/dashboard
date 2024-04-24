import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { mockGetNonPendingWorkspaces } from "tests/mocks/utils/mockGetNonPendingWorkspaces";
import { mockGetUser } from "tests/mocks/utils/mockGetUser";
import { mockGetWorkspaceMembers } from "tests/mocks/utils/mockGetWorkspaceMembers";
import { mockGetWorkspaceSubscription } from "tests/mocks/utils/mockGetWorkspaceSubscription";
import { getLeftNavLink } from "tests/utils/getLeftNavLink";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { navigateToPage } from "./utils/navigateToPage";

test("team-settings-default-tab-subscription-canceled-no-payment: should show the billing tab by default for canceled subscriptions", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings`,
  });

  const navLink = getLeftNavLink(page, "Billing");
  await expect(await navLink.getAttribute("data-is-active")).toBe("true");

  // UI should so "Add payment method" prompt
  const header = page.locator('[data-test-name="Header"]');
  await expect(header).toContainText("Add payment method");
});

const mockWorkspaceMembers = mockGetWorkspaceMembers([
  {
    roles: ["admin"],
  },
]);

const mockWorkspaceSubscription = mockGetWorkspaceSubscription({
  effectiveUntil: getRelativeDate({ daysAgo: 1 }),
  paymentMethods: [],
  status: "canceled",
  trialEnds: getRelativeDate({ daysAgo: 1 }),
});

const mockGraphQLData: MockGraphQLData = {
  GetUser: mockGetUser(),
  GetNonPendingWorkspaces: mockGetNonPendingWorkspaces([
    {
      hasPaymentMethod: false,
    },
  ]),
  GetWorkspaceMembers: mockWorkspaceMembers,
  GetWorkspaceMemberRoles: mockWorkspaceMembers,
  GetWorkspaceSubscription: mockWorkspaceSubscription,
  GetWorkspaceSubscriptionStatus: mockWorkspaceSubscription,
};
