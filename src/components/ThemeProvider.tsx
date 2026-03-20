import { Theme, applyThemeToDOM, getEffectiveTheme, getStoredTheme, storeTheme } from "@/lib/theme";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme());

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    storeTheme(next);
    applyThemeToDOM(getEffectiveTheme(next));
  }, []);

  useEffect(() => {
    applyThemeToDOM(getEffectiveTheme(theme));
  }, [theme]);

  // Listen for OS preference changes when theme is "system"
  useEffect(() => {
    if (theme !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyThemeToDOM(getEffectiveTheme("system"));
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
