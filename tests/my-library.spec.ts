import { test, expect } from "@playwright/test";
import { navigateToPage } from "./utils/navigateToPage";
import { getContextMenuItem } from "./utils/getContextMenuItem";
import { getRecordingRow } from "./utils/getRecordingRow";

test("my-library: filtering and share dialog", async ({ page }) => {
  await navigateToPage({
    page,
    pathname: "/team/me/recordings",
  });

  const recordingRows = getRecordingRow(page);
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
  const deleteButton = getContextMenuItem(page, "Delete");
  expect(deleteButton).not.toBeVisible();
  const shareButton = getContextMenuItem(page, "Share");
  expect(shareButton).toBeVisible();

  // Open the share dialog and verify recording is flagged as public and the owner's name is shown
  await shareButton.click();
  const dialog = page.locator('[data-test-id="Dialog-ShareRecording"]');
  await expect(await dialog.textContent()).toContain(
    "Anyone with the link can view this recording"
  );
  const collaboratorRows = page.locator('[data-test-name="collaborator-row"]');
  await expect(collaboratorRows).toHaveCount(1);
  await expect(await collaboratorRows.textContent()).toContain("Jason Laster");
  await expect(await collaboratorRows.textContent()).toContain("Owner");
});
