import { test, expect } from "@playwright/test";
import { startTest } from "./helpers";

test("should require sign-in", async ({ page }) => {
  await startTest({
    page,
  });

  const recordingRows = page.locator('[data-test-name="recording-row"]');
  await expect(recordingRows).not.toHaveCount(1);

  // Should be able to filter recordings by their name
  const input = page.locator('[data-test-id="filter-input"]');
  await input.fill("overboard");
  await input.press("Enter");
  await expect(recordingRows).toHaveCount(1);

  // Open the recording menu
  const button = recordingRows
    .first()
    .locator('[data-test-name="recording-row-drop-down-trigger"]');
  await button.click();

  // The "Share" option should be present but the "Delete" option should not
  const deleteButton = page.locator('[data-test-name="ContextMenuItem"]', {
    hasText: "Delete",
  });
  expect(deleteButton).not.toBeVisible();
  const shareButton = page.locator('[data-test-name="ContextMenuItem"]', {
    hasText: "Share",
  });
  expect(shareButton).toBeVisible();

  // Open the share dialog
  await shareButton.click();

  // Verify recording is flagged as public
  const dialog = page.locator('[data-test-id="recording-share-dialog"]');
  await expect(await dialog.textContent()).toContain(
    "Anyone with the link can view this recording"
  );

  // Verify recording owner is displayed
  const collaboratorRows = page.locator('[data-test-name="collaborator-row"]');
  await expect(collaboratorRows).toHaveCount(1);
  await expect(await collaboratorRows.textContent()).toContain("Jason Laster");
  await expect(await collaboratorRows.textContent()).toContain("Owner");
});
