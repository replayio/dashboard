import { test } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";
import { login, waitForLoginPage } from "./utils/login";

test("login-logout-library: should login and logout from the library", async ({ page }) => {
  test.slow();

  await navigateToPage({
    apiKey: "",
    page,
    pathname: "/",
  });

  await login(page);

  // verify that we're logged in
  await page.locator('[data-test-name="LeftNavLink"]').filter({ hasText: "My library" }).waitFor();

  await page.getByText("View settings").click();
  await page.getByText("Sign out").click();

  await waitForLoginPage(page);
});
