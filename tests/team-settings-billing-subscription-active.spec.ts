import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { mockGetWorkspaces } from "tests/mocks/utils/mockGetWorkspaces";
import { mockGetUser } from "tests/mocks/utils/mockGetUser";
import { mockGetWorkspaceSubscription } from "tests/mocks/utils/mockGetWorkspaceSubscription";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { navigateToPage } from "./utils/navigateToPage";

test("team-settings-billing-subscription-active: should show information about the subscription and payment method on file", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings/billing`,
  });

  const banner = page.locator('[data-test-name="Header"]');
  await expect(banner).not.toBeVisible();

  await expect(page.locator('[data-test-id="AddPaymentMethodButton"]')).not.toBeVisible();

  const table = page.locator('[data-test-id="PricingDetailsTable"]');
  await expect(table).toContainText("Renewal date");
  await expect(table).toContainText("Payment method");

  // We can't end-to-end test removing CC (at least for now)
  // but we can at least test that clicking the link shows a confirmation prompt

  const button = page.locator('[data-test-id="RemovePaymentMethodButton"]');
  await button.click();

  const dialog = page.locator('[data-test-name="ModalDialog"]');
  await expect(dialog).toContainText("Remove payment method");
});

const mockGraphQLData: MockGraphQLData = {
  GetUser: mockGetUser(),
  GetWorkspaces: mockGetWorkspaces([
    {
      hasPaymentMethod: true,
    },
  ]),
  GetWorkspaceSubscription: mockGetWorkspaceSubscription({
    effectiveUntil: getRelativeDate({ daysAgo: -7 }),
    paymentMethods: [
      {
        default: true,
      },
    ],
    status: "active",
  }),
};
