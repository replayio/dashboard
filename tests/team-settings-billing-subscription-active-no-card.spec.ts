import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { mockGetWorkspaces } from "tests/mocks/utils/mockGetWorkspaces";
import { mockGetUser } from "tests/mocks/utils/mockGetUser";
import { mockGetWorkspaceSubscription } from "tests/mocks/utils/mockGetWorkspaceSubscription";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { navigateToPage } from "./utils/navigateToPage";

test("team-settings-billing-subscription-active-no-card: should show option to add payment method when missing", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/billing`,
  });

  const banner = page.locator('[data-test-name="Header"]');
  await expect(banner).not.toBeVisible();

  const table = page.locator('[data-test-id="PricingDetailsTable"]');
  await expect(table).toContainText("Renewal date");
  await expect(table).not.toContainText("Payment method");

  // We can't end-to-end test adding CC (at least for now)
  // but we can at least test that the button is shown

  const button = page.locator('[data-test-id="AddPaymentMethodButton"]');
  await expect(button).toBeVisible();
});

const mockGraphQLData: MockGraphQLData = {
  GetUser: mockGetUser(),
  GetWorkspaces: mockGetWorkspaces([
    {
      hasPaymentMethod: false,
    },
  ]),
  GetWorkspaceSubscription: mockGetWorkspaceSubscription({
    effectiveUntil: getRelativeDate({ daysAgo: -7 }),
    paymentMethods: [],
    status: "active",
  }),
};
