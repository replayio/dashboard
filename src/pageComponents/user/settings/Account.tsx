import { Button } from "@/components/Button";
import { SessionContext } from "@/components/SessionContext";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { COOKIES } from "@/constants";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import { useUserSettings } from "@/pageComponents/user/settings/UserSettingsContext";
import { deleteCookieValueClient } from "@/utils/cookie";
import { setAccessTokenInBrowserPrefs } from "@/utils/replayBrowser";
import { useContext, useState } from "react";

async function redirectToPortal(): Promise<void> {
  const res = await fetch("/api/stripe/portal", {
    method: "POST",
    credentials: "same-origin",
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Portal failed: ${res.status}`);
  }

  const { url } = (await res.json()) as { url: string };
  window.location.href = url;
}

export function Account() {
  const { user } = useContext(SessionContext);
  const { openModal } = useUserSettings();
  const { subscription, isLoading: isSubLoading } = useStripeSubscription();

  const [isPending, setIsPending] = useState(false);
  const [portalPending, setPortalPending] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  const onSignOut = async () => {
    setIsPending(true);
    setAccessTokenInBrowserPrefs(null);
    deleteCookieValueClient(COOKIES.defaultPathname);
    deleteCookieValueClient(COOKIES.accessToken);
    window.location.replace(`/api/auth/logout?${new URLSearchParams({ origin: location.origin })}`);
  };

  const onManageSubscription = async () => {
    setPortalPending(true);
    setPortalError(null);
    try {
      await redirectToPortal();
    } catch (err) {
      setPortalError(err instanceof Error ? err.message : "Something went wrong");
      setPortalPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-0">
      {/* Account row */}
      <div className="flex items-center justify-between py-4 border-b border-border">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">Account</div>
          <div className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{user.name}</span> (
            {user.email})
          </div>
        </div>
        <Button disabled={isPending} onClick={onSignOut} variant="outline" size="small">
          Sign out
        </Button>
      </div>

      {/* Subscription row */}
      <div className="flex items-center justify-between py-4 border-b border-border">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">Subscription</div>
          {isSubLoading ? (
            <div className="text-sm text-muted-foreground">Loading…</div>
          ) : subscription ? (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{subscription.plan.name}</span>
              {" · "}
              <span className="capitalize">{subscription.status}</span>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No active subscription</div>
          )}
          {portalError && (
            <div className="text-xs text-destructive mt-1">{portalError}</div>
          )}
        </div>
        {subscription ? (
          <Button
            variant="outline"
            size="small"
            disabled={portalPending}
            onClick={onManageSubscription}
          >
            Manage Subscription
          </Button>
        ) : !isSubLoading ? (
          <Button
            variant="solid"
            size="small"
            onClick={() => openModal("subscription")}
          >
            Choose a Plan
          </Button>
        ) : null}
      </div>

      <ThemeSwitch />
    </div>
  );
}
