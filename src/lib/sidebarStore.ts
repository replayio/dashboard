const STORAGE_KEY = "replay_sidebar_collapsed";

export function getStoredSidebarCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function storeSidebarCollapsed(collapsed: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, collapsed ? "true" : "false");
  } catch {
    // ignore
  }
}
