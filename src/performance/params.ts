export function getRecordingId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("recordingId") ?? null;
}
