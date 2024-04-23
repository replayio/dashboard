import { test, expect } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";
import { getLeftNavLink } from "./utils/getLeftNavLink";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getRecordingRow } from "./utils/getRecordingRow";

test("team-library: filtering and share dialog", async ({ page }) => {
  await navigateToPage({
    page,
    pathname: "/team/dzozMDRhOTAwOC01YzdlLTRjNmMtODQwNi0yYTY4YTNjMmEyYzk=/recordings",
  });

  // Verify the team library route has loaded based on the left-nav links
  await expect(await getLeftNavLink(page, "Recordings")).toBeVisible();
  await expect(await getLeftNavLink(page, "Settings")).toBeVisible();

  const recordingRows = getRecordingRow(page);
  await expect(recordingRows).toHaveCount(5);

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
  const deleteButton = getContextMenuItem(page, "Delete");
  expect(deleteButton).toBeVisible();
  const shareButton = getContextMenuItem(page, "Share");
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

  // Delete dialog, confirmation
  await menuButton.click();
  await deleteButton.click();
  const deleteDialog = page.locator('[data-test-id="Dialog-DeleteRecording"]');
  await expect(await deleteDialog.textContent()).toContain("Delete Replay?");
  await page.locator('[data-test-nam="ModalDialog-CloseButton"]').click();
});
