export function useWorkspaceIdFromUrl() {
  const url = new URL(window.location.href);
  return url.pathname.split("/")[2] as string;
}
