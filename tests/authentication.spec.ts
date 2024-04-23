import { expect, test } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";

test("authentication: should require authentication to view the library", async ({ page }) => {
  await navigateToPage({
    apiKey: "",
    page,
    pathname: "/",
  });

  await expect(page.getByText("Sign in with Google")).toBeVisible();
});
