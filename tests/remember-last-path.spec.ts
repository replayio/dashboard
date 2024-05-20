import { test, expect } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";

test("remember-last-path: requests to the root path should auto re-direct back to the most recently viewed page", async ({
  page,
}) => {
  // Verify that the Home page is the default path
  {
    await navigateToPage({
      page,
      pathname: "/",
    });

    const link = page.locator('[data-test-name="LeftNavLink"][data-is-active]');
    await expect(await link.textContent()).toBe("Home");
  }

  // Visit My Library; this should be the new last remembered path
  {
    await navigateToPage({
      page,
      pathname: "/team/me/recordings",
    });

    const link = page.locator('[data-test-name="LeftNavLink"][data-is-active]');
    await expect(await link.textContent()).toBe("My Library");
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

  // Visit team recordings page
  {
    const link = page.locator('[data-test-name="LeftNavLink"]', {
      hasText: "Replay: Authenticated e2e tests",
    });
    await link.click();
    await expect(page.locator('[data-test-id="LeftNavLink-BackLink"]')).toBeVisible();
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

  // Go back to Home
  {
    const link = page.locator('[data-test-id="LeftNavLink-BackLink"]').last();
    await link.click();

    const header = page.locator('[data-test-id="LeftNavLink-BackLink"]');
    await expect(header).not.toBeVisible();
  }

  // Navigate to root and expect to be redirected back to Home
  {
    await navigateToPage({
      page,
      pathname: "/",
    });

    const link = page.locator('[data-test-name="LeftNavLink"][data-is-active]');
    await expect(await link.textContent()).toBe("Home");
  }
});
