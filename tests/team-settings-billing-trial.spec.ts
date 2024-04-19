import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { mockGetNonPendingWorkspaces } from "tests/mocks/utils/mockGetNonPendingWorkspaces";
import { mockGetUser } from "tests/mocks/utils/mockGetUser";
import { mockGetWorkspaceMembers } from "tests/mocks/utils/mockGetWorkspaceMembers";
import { mockGetWorkspaceSubscription } from "tests/mocks/utils/mockGetWorkspaceSubscription";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { navigateToPage } from "./utils/navigateToPage";

test("team-settings-billing-trial: should prompt the user to add payment information if none has been entered", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/billing`,
  });

  const banner = page.locator('[data-test-name="Header"]');
  await expect(banner).toContainText("Trial ends in 5 days");

  const table = page.locator('[data-test-id="PricingDetailsTable"]');
  await expect(table).toContainText("Renewal date");
  await expect(table).not.toContainText("Payment method");

  const button = page.locator('[data-test-id="AddPaymentMethodButton"]');
  await expect(button).toBeVisible();

  // We can't end-to-end test adding CC (at least for now)
  // but we can at least test that clicking the "Add payment method" button shows the form

  await button.click();

  const form = page.locator('[data-test-id="AddPaymentForm"]');
  await expect(form).toBeVisible();
});

const mockWorkspaceMembers = mockGetWorkspaceMembers([
  {
    roles: ["admin"],
  },
]);

const mockWorkspaceSubscription = mockGetWorkspaceSubscription({
  effectiveUntil: getRelativeDate({ daysAgo: -5 }),
  paymentMethods: [],
  status: "trialing",
  trialEnds: getRelativeDate({ daysAgo: -5 }),
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
