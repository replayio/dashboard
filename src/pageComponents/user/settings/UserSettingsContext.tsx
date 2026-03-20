import { Account } from "@/pageComponents/user/settings/Account";
import { Legal } from "@/pageComponents/user/settings/Legal";
import { Support } from "@/pageComponents/user/settings/Support";
import { UserApiKeys } from "@/pageComponents/user/settings/UserApiKeys";
import { Icon, IconType } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import useModalDismissSignal from "@/hooks/useModalDismissSignal";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type UserSettingsRoute = "account" | "api-keys" | "support" | "legal";

const VALID_ROUTES: UserSettingsRoute[] = ["account", "api-keys", "support", "legal"];

type UserSettingsContextValue = {
  openModal: (route?: UserSettingsRoute) => void;
  closeModal: () => void;
};

const UserSettingsContext = createContext<UserSettingsContextValue | null>(null);

export function useUserSettings() {
  const ctx = useContext(UserSettingsContext);
  if (!ctx) throw new Error("useUserSettings must be used within UserSettingsProvider");
  return ctx;
}

export function UserSettingsProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<UserSettingsRoute>("account");
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((r: UserSettingsRoute = "account") => {
    setRoute(r);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const openSettings = params.get("openSettings");
    if (openSettings && VALID_ROUTES.includes(openSettings as UserSettingsRoute)) {
      openModal(openSettings as UserSettingsRoute);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [openModal]);

  useModalDismissSignal(modalRef, closeModal, isOpen);

  const value: UserSettingsContextValue = { openModal, closeModal };

  const navItems: { route: UserSettingsRoute; label: string; iconType: IconType }[] = [
    { route: "account", label: "Account", iconType: "account" },
    { route: "api-keys", label: "API keys", iconType: "api-keys" },
    { route: "support", label: "Support", iconType: "support" },
    { route: "legal", label: "Legal", iconType: "legal" },
  ];

  let panel: ReactNode = null;
  switch (route) {
    case "account":
      panel = <Account />;
      break;
    case "api-keys":
      panel = <UserApiKeys />;
      break;
    case "legal":
      panel = <Legal />;
      break;
    case "support":
      panel = <Support />;
      break;
  }

  const modal = isOpen && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-test-name="UserSettingsModal"
    >
      <div
        ref={modalRef}
        className="flex h-[85vh] max-h-[700px] w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Sidebar */}
        <div className="flex w-56 shrink-0 flex-col border-r border-border bg-muted/30">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-base font-semibold text-foreground">Settings</span>
            <IconButton
              iconType="close"
              onClick={closeModal}
              className="shrink-0"
              data-test-name="UserSettingsModal-CloseButton"
            />
          </div>
          <nav className="flex flex-col gap-0.5 p-2">
            {navItems.map(({ route: r, label, iconType }) => (
              <button
                key={r}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  route === r
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
                onClick={() => setRoute(r)}
              >
                <Icon className="h-4 w-4 shrink-0" type={iconType} />
                {label}
              </button>
            ))}
          </nav>
        </div>
        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-auto p-6">{panel}</div>
      </div>
    </div>
  );

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" && createPortal(modal, document.body)}
    </UserSettingsContext.Provider>
  );
}
