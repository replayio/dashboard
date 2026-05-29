import { COOKIES } from "@/constants";
import { compress } from "@/utils/compression";
import { Page } from "@playwright/test";
import assert from "assert";
import chalk from "chalk";
import { MockGraphQLData } from "@/testing/mockGraphQLTypes";
import { debugPrint } from "./debugPrint";

export async function navigateToPage({
  apiKey,
  mockGraphQLData,
  page,
  pathname,
}: {
  apiKey?: string;
  mockGraphQLData?: MockGraphQLData;
  page: Page;
  pathname: string;
}) {
  if (apiKey === undefined) {
    apiKey = process.env.TEST_USER_API_KEY;
  }

  if (pathname.startsWith("/")) {
    pathname = pathname.slice(1);
  }

  let host = process.env.APP_URL;
  assert(host, "process.env.APP_URL is required");
  if (host.endsWith("/")) {
    host = host.slice(0, -1);
  }

  const url = new URL(`${host}/${pathname}`);
  if (!pathname.startsWith("recording")) {
    // we don't want to set the e2e param for devtools URLs because that would instruct
    // the devtools app to use an apiKey from the URL instead of a token from the
    // dashboard app, which would break the login-logout-devtools test
    url.searchParams.set("e2e", "1");
  }
  if (apiKey) {
    url.searchParams.set("apiKey", apiKey);
  }
  if (mockGraphQLData) {
    url.searchParams.set("mockGraphQLData", compress(mockGraphQLData));
  }

  await debugPrint(page, `Navigating to ${chalk.blueBright(url)}`, "navigateToPage");
  await page.context().addCookies([
    {
      name: COOKIES.e2eSkipIntake,
      value: "1",
      url: `${host}/`,
    },
  ]);
  // Mock the Stripe subscription REST endpoint so the subscription gate does not
  // block e2e tests. In test environments there is no real Stripe/Auth0 config,
  // so the real endpoint would 500 → subscription=null → gate fires over the UI.
  await page.route("**/api/stripe/subscription", route => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        subscription: {
          plan: { name: "Free", key: "free-v1", priceId: "price_1TZEsXEfKucJn4vk68YK7hSN" },
          status: "active",
          currentPeriodEnd: Math.floor(Date.now() / 1000) + 86400 * 30,
          cancelAtPeriodEnd: false,
          seatCount: 1,
        },
      }),
    });
  });

  await page.goto(url.toString());
}
