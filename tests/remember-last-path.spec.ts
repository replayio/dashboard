import { test, expect } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";

test("remember-last-path: requests to the root path should auto re-direct back to the most recently viewed page", async ({
  page,
}) => {
  // Visit My Library
  await navigateToPage({
    page,
    pathname: "/team/me/recordings",
  });

  // Navigate to root and expect to be redirected back to My Library
  {
    await navigateToPage({
      page,
      pathname: "/",
    });

    const link = page.locator('[data-test-name="LeftNavLink"][data-is-active]');
    await expect(await link.textContent()).toBe("My Library");
  }

  // Visit team recordings page
  {
    const link = page.locator('[data-test-name="LeftNavLink"]', {
      hasText: "Replay: Authenticated e2e tests",
    });
    await link.click();
    await expect(
      page.locator('[data-test-id="LeftNavLink-BackLink"]')
    ).toBeVisible();
  }

  // Navigate to root and expect to be redirected back to team recordings page
  {
    await navigateToPage({
      page,
      pathname: "/",
    });

    const header = page.locator('[data-test-id="LeftNavLink-BackLink"]');
    await expect(header).not.toBeVisible();
  }

  // Go back to My Library
  {
    const link = page.locator('[data-test-id="LeftNavLink-BackLink"]').last();
    await link.click();

    const header = page.locator('[data-test-id="LeftNavLink-BackLink"]');
    await expect(header).not.toBeVisible();
  }

  // Navigate to root and expect to be redirected back to My Library
  {
    await navigateToPage({
      page,
      pathname: "/",
    });

    const link = page.locator('[data-test-name="LeftNavLink"][data-is-active]');
    await expect(await link.textContent()).toBe("My Library");
  }
});
