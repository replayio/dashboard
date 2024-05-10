import { expect, test } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";
import { hashValue, pollForAuthentication } from "./utils/externalBrowserAuth";
import { login } from "./utils/login";

test("login-external-browser: should login using an external browser", async ({ page }) => {
  test.slow();

  const key = hashValue(String(Date.now()));

  await navigateToPage({
    apiKey: "",
    page,
    pathname: `/api/browser/auth?key=${key}&source=cli`,
  });

  await login(page);

  await page.getByText("Authentication Complete").waitFor({ timeout: 10_000 });

  const token = await pollForAuthentication(key);
  expect(token.accessToken).toBeTruthy();
});
