export type Theme = "dark" | "light" | "system";

const STORAGE_KEY = "replay_theme";
const DEFAULT_THEME: Theme = "dark";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return stored ?? DEFAULT_THEME;
}

export function storeTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, theme);
}

export function getEffectiveTheme(theme: Theme): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

export function applyThemeToDOM(effectiveTheme: "dark" | "light") {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", effectiveTheme);
  document.documentElement.classList.toggle("dark", effectiveTheme === "dark");
}

/**
 * Inline script injected into <head> via _document.tsx to prevent
 * a flash of wrong theme before React hydrates.
 */
export const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('${STORAGE_KEY}') || '${DEFAULT_THEME}';
    var effective = theme;
    if (theme === 'system') {
      effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effective);
    if (effective === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch(e) {}
})();
`;
