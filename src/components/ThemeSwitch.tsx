import { useTheme } from "@/components/ThemeProvider";
import { Theme } from "@/lib/theme";
import { useEffect, useRef, useState } from "react";

const themes: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = themes.find(t => t.value === theme) ?? themes[1];

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div className="flex items-center justify-between py-4 border-b border-border">
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-foreground">Theme</div>
        <div className="text-sm text-muted-foreground">Choose your preferred appearance</div>
      </div>

      <div ref={ref} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-border bg-card text-foreground hover:border-ring min-w-[160px] justify-between transition-colors cursor-pointer"
        >
          <span>{current?.label ?? "light"}</span>
          <svg
            className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-full min-w-[160px] bg-card border border-border rounded-md shadow-lg z-50 py-1">
            {themes.map(t => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-foreground transition-colors cursor-pointer ${
                  theme === t.value ? "bg-accent" : "hover:bg-accent"
                }`}
              >
                <span>{t.label}</span>
                {theme === t.value && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
