import { test, expect } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";
import { getNavLink } from "./utils/getNavLink";

test("test-suites-library: filtering and share dialog", async ({ page }) => {
  await navigateToPage({
    page,
    pathname: "/team/dzowNDAyOGMwYS05ZjM1LTQ2ZjktYTkwYi1jNzJkMTIzNzUxOTI=/runs",
  });

  // Verify the test suite route has loaded based on the left-nav links
  await expect(await getNavLink(page, "Runs")).toBeVisible();
  await expect(await getNavLink(page, "Tests")).toBeVisible();
  await expect(await getNavLink(page, "Settings")).toBeVisible();

  // TODO
});
