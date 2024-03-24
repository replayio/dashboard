import { test, expect } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";

test("team-library: filtering and share dialog", async ({ page }) => {
  await navigateToPage({
    page,
    pathname:
      "/team/dzozMDRhOTAwOC01YzdlLTRjNmMtODQwNi0yYTY4YTNjMmEyYzk=/recordings",
  });

  const recordingRows = page.locator('[data-test-name="recording-row"]');
  await expect(recordingRows).not.toHaveCount(5);

  // Should be able to filter recordings by their name
  const input = page.locator('[data-test-id="filter-input"]');
  await input.fill("comments");
  await input.press("Enter");
  await expect(recordingRows).toHaveCount(3);

  // Open the recording menu
  const menuButton = recordingRows
    .first()
    .locator('[data-test-name="recording-row-drop-down-trigger"]');
  await menuButton.click();

  // Both "Share" and "Delete" options should be visible
  const deleteButton = page.locator('[data-test-name="ContextMenuItem"]', {
    hasText: "Delete",
  });
  expect(deleteButton).toBeVisible();
  const shareButton = page.locator('[data-test-name="ContextMenuItem"]', {
    hasText: "Share",
  });
  expect(shareButton).toBeVisible();

  // Open the share dialog and verify recording is not public and the owner's name is shown
  await shareButton.click();
  const shareDialog = page.locator('[data-test-id="Dialog-ShareRecording"]');
  await expect(await shareDialog.textContent()).not.toContain(
    "Anyone with the link can view this recording"
  );
  const collaboratorRows = page.locator('[data-test-name="collaborator-row"]');
  await expect(collaboratorRows).toHaveCount(1);
  await expect(await collaboratorRows.textContent()).toContain("Owner");
  await page.locator('[data-test-nam="ModalDialog-CloseButton"]').click();

  // TODO Delete dialog, confirmation
  await menuButton.click();
  await deleteButton.click();
  const deleteDialog = page.locator('[data-test-id="Dialog-DeleteRecording"]');
  await expect(await deleteDialog.textContent()).toContain("Delete Replay?");
  await page.locator('[data-test-nam="ModalDialog-CloseButton"]').click();
});
