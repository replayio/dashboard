import { Account } from "@/pageComponents/user/settings/Account";
import { Legal } from "@/pageComponents/user/settings/Legal";
import { PlanSelection } from "@/pageComponents/user/settings/PlanSelection";
import { Support } from "@/pageComponents/user/settings/Support";
import { UserApiKeys } from "@/pageComponents/user/settings/UserApiKeys";
import { Icon, IconType } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import { EndToEndTestContext } from "@/components/EndToEndTestContext";
import useModalDismissSignal from "@/hooks/useModalDismissSignal";
import { COOKIES } from "@/constants";
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

export type UserSettingsRoute = "account" | "api-keys" | "support" | "legal" | "subscription";

const VALID_ROUTES: UserSettingsRoute[] = [
  "account",
  "api-keys",
  "support",
  "legal",
  "subscription",
];

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

  const { subscription, isLoading: subscriptionLoading, refetch } = useStripeSubscription();
  // In e2e test mode, skip the subscription gate so tests are not blocked by the overlay.
  // e2eSkipIntake cookie is set by navigateToPage() for ALL Playwright e2e tests.
  // mockGraphQLData covers tests that pass mock data explicitly.
  const { mockGraphQLData: e2eMockData } = useContext(EndToEndTestContext);
  const isE2EMode =
    e2eMockData !== null ||
    (typeof document !== "undefined" &&
      document.cookie.includes(COOKIES.e2eSkipIntake));

  const openModal = useCallback((r: UserSettingsRoute = "account") => {
    setRoute(r);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle openSettings query param
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const openSettings = params.get("openSettings");
    if (openSettings && VALID_ROUTES.includes(openSettings as UserSettingsRoute)) {
      openModal(openSettings as UserSettingsRoute);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [openModal]);

  // Handle checkout=success query param — refetch subscription to lift the gate
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      refetch();
      // Remove the query param so a page refresh doesn't re-trigger
      const next = new URL(window.location.href);
      next.searchParams.delete("checkout");
      window.history.replaceState(null, "", next.toString());
    }
  }, [refetch]);

  useModalDismissSignal(modalRef, closeModal, isOpen);

  const value: UserSettingsContextValue = { openModal, closeModal };

  const navItems: { route: UserSettingsRoute; label: string; iconType: IconType }[] = [
    { route: "account", label: "Account", iconType: "account" },
    { route: "api-keys", label: "API keys", iconType: "api-keys" },
    { route: "subscription", label: "Subscription", iconType: "billing" },
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
    case "subscription":
      panel = <PlanSelection />;
      break;
  }

  const modal = isOpen && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-test-name="UserSettingsModal"
    >
      <div
        ref={modalRef}
        className="flex h-[85vh] max-h-[700px] w-full max-w-6xl overflow-hidden rounded-xl border border-border bg-card shadow-xl"
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

  // Subscription gate — blocks all app access until user selects a plan.
  // Shown when subscription fetch is complete and user has no active subscription.
  const showGate = !isE2EMode && !subscriptionLoading && subscription === null;

  const gate =
    showGate &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
        data-test-name="SubscriptionGate"
      >
        <div className="flex w-full max-w-6xl flex-col gap-2 overflow-auto rounded-xl border border-border bg-card p-8 shadow-2xl mx-4 max-h-[90vh]">
          <div className="mb-2 text-center">
            <h1 className="text-2xl font-bold text-foreground">Get started with Replay</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a plan to access the dashboard.
            </p>
          </div>
          <PlanSelection />
        </div>
      </div>,
      document.body
    );

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" && createPortal(modal, document.body)}
      {gate}
    </UserSettingsContext.Provider>
  );
}
