import { Icon, IconType } from "@/components/Icon";
import { useUserSettings } from "@/pageComponents/user/settings/UserSettingsContext";
import { SessionContext } from "@/components/SessionContext";
import { COOKIES } from "@/constants";
import { deleteCookieValueClient } from "@/utils/cookie";
import { setAccessTokenInBrowserPrefs } from "@/utils/replayBrowser";
import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MENU_ITEMS: {
  route: "account" | "api-keys" | "support" | "legal";
  label: string;
  iconType: IconType;
}[] = [
  { route: "account", label: "Account", iconType: "account" },
  { route: "api-keys", label: "API keys", iconType: "api-keys" },
  { route: "support", label: "Support", iconType: "support" },
  { route: "legal", label: "Legal", iconType: "legal" },
];

export function CurrentUser() {
  const { user } = useContext(SessionContext);
  const { openModal } = useUserSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{ bottom: number; left: number }>({
    bottom: 0,
    left: 0,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuStyle({
      bottom: window.innerHeight - rect.top + 8,
      left: rect.left,
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        closeMenu();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("mousedown", handleClick, true);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeMenu]);

  const onSignOut = async () => {
    closeMenu();
    setAccessTokenInBrowserPrefs(null);
    deleteCookieValueClient(COOKIES.defaultPathname);
    deleteCookieValueClient(COOKIES.accessToken);
    window.location.replace(`/api/auth/logout?${new URLSearchParams({ origin: location.origin })}`);
  };

  const menu = isOpen && (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[220px] rounded-lg border border-border bg-card py-2 shadow-lg"
      style={{
        bottom: menuStyle.bottom,
        left: menuStyle.left,
      }}
      data-test-name="CurrentUser-Menu"
    >
      <div className="border-b border-border px-4 py-3">
        <div className="text-xs text-muted-foreground">Signed in as</div>
        <div className="truncate text-sm font-medium text-foreground">{user.email}</div>
      </div>
      <div className="py-1">
        {MENU_ITEMS.map(({ route, label, iconType }) => (
          <button
            key={route}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm font-medium text-foreground hover:bg-accent"
            onClick={() => {
              closeMenu();
              openModal(route);
            }}
          >
            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" type={iconType} />
            {label}
          </button>
        ))}
        <button
          className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm font-medium text-foreground hover:bg-accent"
          onClick={onSignOut}
        >
          <Icon className="h-4 w-4 shrink-0 text-muted-foreground" type="logout" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative shrink-0 border-t border-border">
      <button
        ref={triggerRef}
        className="flex w-full flex-row items-center gap-3 px-3 py-3 text-foreground transition-colors hover:bg-accent"
        onClick={() => setIsOpen(o => !o)}
        type="button"
      >
        {user.picture ? (
          <img
            alt={`${user.name} avatar`}
            className="hidden h-8 w-8 rounded-full md:block"
            referrerPolicy="no-referrer"
            src={user.picture}
          />
        ) : (
          <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary md:flex">
            {user.name?.charAt(0) ?? "?"}
          </div>
        )}
        <div className="min-w-0 flex-1 truncate text-left">
          <div className="truncate text-sm font-medium">{user.name}</div>
          <div className="truncate text-xs text-muted-foreground">View settings</div>
        </div>
      </button>
      {typeof document !== "undefined" && createPortal(menu, document.body)}
    </div>
  );
}
