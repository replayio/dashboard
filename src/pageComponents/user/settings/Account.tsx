import { Button } from "@/components/Button";
import { SessionContext } from "@/components/SessionContext";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { COOKIES } from "@/constants";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import { deleteCookieValueClient } from "@/utils/cookie";
import { setAccessTokenInBrowserPrefs } from "@/utils/replayBrowser";
import { useCallback, useContext, useState } from "react";
import { useUserSettings } from "./UserSettingsContext";

export function Account() {
  const { user } = useContext(SessionContext);
  const { openModal } = useUserSettings();

  const [isPending, setIsPending] = useState(false);

  const onClick = async () => {
    setIsPending(true);

    setAccessTokenInBrowserPrefs(null);
    deleteCookieValueClient(COOKIES.defaultPathname);
    deleteCookieValueClient(COOKIES.accessToken);

    window.location.replace(`/api/auth/logout?${new URLSearchParams({ origin: location.origin })}`);
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between py-4 border-b border-border">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">Account</div>
          <div className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{user.name}</span> (
            {user.email})
          </div>
        </div>
        <Button disabled={isPending} onClick={onClick} variant="outline" size="small">
          Sign out
        </Button>
      </div>
      <ThemeSwitch />
      <SubscriptionSection onNavigateToSubscription={() => openModal("subscription")} />
    </div>
  );
}

function SubscriptionSection({
  onNavigateToSubscription,
}: {
  onNavigateToSubscription: () => void;
}) {
  const { subscription: rawSubscription, isLoading, workspaceId } = useStripeSubscription();
  // Treat canceled subscriptions the same as no subscription
  const subscription = rawSubscription?.status === "canceled" ? null : rawSubscription;
  const [isPortalPending, setIsPortalPending] = useState(false);

  const openBillingPortal = useCallback(async () => {
    if (isPortalPending || !workspaceId) return;
    setIsPortalPending(true);

    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
      if (!res.ok) {
        console.error("[Account] portal error:", res.status);
        setIsPortalPending(false);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
        // Don't reset isPending — navigating away
      } else {
        setIsPortalPending(false);
      }
    } catch (err) {
      console.error("[Account] portal error:", err);
      setIsPortalPending(false);
    }
  }, [isPortalPending, workspaceId]);

  return (
    <div className="flex items-center justify-between py-4 border-b border-border">
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium">Subscription</div>
        {isLoading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : subscription ? (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{subscription.plan.name}</span>
            {" — "}
            {subscription.cancelAtPeriodEnd ? (
              <>
                <span>Active</span>
                {subscription.currentPeriodEnd && (
                  <span className="ml-1 text-xs text-amber-500">
                    (Update scheduled, cancels{" "}
                    {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()})
                  </span>
                )}
              </>
            ) : (
              <span className="capitalize">{subscription.status}</span>
            )}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No active subscription</div>
        )}
      </div>
      {!isLoading && (
        <div>
          {subscription ? (
            <Button
              disabled={isPortalPending}
              onClick={openBillingPortal}
              variant="outline"
              size="small"
            >
              {isPortalPending ? "Opening…" : "Manage Subscription"}
            </Button>
          ) : (
            <button
              className="text-sm font-medium text-primary hover:underline"
              onClick={onNavigateToSubscription}
            >
              Choose a Plan
            </button>
          )}
        </div>
      )}
    </div>
  );
}
