import { getRelativeDate } from "@/utils/date";
import { expect, test } from "@playwright/test";
import { mockGetWorkspaces } from "tests/mocks/utils/mockGetWorkspaces";
import { mockGetUser } from "tests/mocks/utils/mockGetUser";
import { mockGetWorkspaceSubscription } from "tests/mocks/utils/mockGetWorkspaceSubscription";
import { getLeftNavLink } from "tests/utils/getLeftNavLink";
import { DEFAULT_WORKSPACE_ID } from "./mocks/constants";
import { MockGraphQLData } from "./mocks/types";
import { navigateToPage } from "./utils/navigateToPage";

test("team-settings-default-tab-subscription-canceled: should show the billing tab by default for canceled subscriptions", async ({
  page,
}) => {
  await navigateToPage({
    mockGraphQLData,
    page,
    pathname: `/team/${DEFAULT_WORKSPACE_ID}/settings`,
  });

  const navLink = getLeftNavLink(page, "Members");
  await expect(await navLink.getAttribute("data-is-active")).toBe("true");
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
