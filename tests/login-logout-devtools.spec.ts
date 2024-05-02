import { test } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";
import { login, waitForLoginPage } from "./utils/login";

test("login-logout-devtools: should login and logout from devtools", async ({ page }) => {
  test.slow();

  await navigateToPage({
    apiKey: "",
    page,
    pathname: "/recording/14864edc-ade0-41c0-be75-80e6904b50e4",
  });

  await page.locator('[data-test-id="UserOptions-DropdownButton"]').click();
  await page.getByText("Sign In").click();

  await login(page);

  await page.locator('[data-test-id="UserOptions-DropdownButton"]').click();
  await page.getByText("Sign Out").click();

  await waitForLoginPage(page);
});
