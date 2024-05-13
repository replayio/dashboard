import { compress } from "@/utils/compression";
import { Page } from "@playwright/test";
import assert from "assert";
import chalk from "chalk";
import { MockGraphQLData } from "../mocks/types";
import { debugPrint } from "./debugPrint";
import { SEARCH_PARAMS } from "@/constants";

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
    url.searchParams.set(SEARCH_PARAMS.e2eFlag, "1");
  }
  if (apiKey) {
    url.searchParams.set(SEARCH_PARAMS.accessToken, apiKey);
  }
  if (mockGraphQLData) {
    url.searchParams.set(SEARCH_PARAMS.mockGraphQLData, compress(mockGraphQLData));
  }

  await debugPrint(page, `Navigating to ${chalk.blueBright(url)}`, "navigateToPage");
  await page.goto(url.toString());
}
