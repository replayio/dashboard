import { LoginLayout } from "@/components/LoginLayout";
import { SessionContext } from "@/components/SessionContext";
import { AccountSwitcherForm } from "@/pageComponents/login/AccountSwitcherForm";
import { DefaultLoginForm } from "@/pageComponents/login/DefaultLoginForm";
import { ReplayBrowserLoginForm } from "@/pageComponents/login/ReplayBrowserLoginForm";
import { SSOLoginForm } from "@/pageComponents/login/SSOLoginForm";
import { readAdAttribution } from "@/utils/adAttribution";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const defaultConnection = "google-oauth2";
const emailConnection = "Username-Password-Authentication";
const githubConnection = "github";

const AD_ATTR_KEYS = [
  "li_fat_id",
  "twclid",
  "rdt_cid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get("returnTo") || "/";
  const isExternalAuth = returnTo === "/api/browser/auth";
  const { user } = useContext(SessionContext);
  const [switchAccount, setSwitchAccount] = useState(false);
  const [ssoLogin, setSSOLogin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  function onLogin(connection: string) {
    const params: Record<string, string> = {
      connection,
      returnTo,
      origin: location.origin,
    };
    // prefer any ad-attribution params on the current URL (freshest),
    // fall back to the .replay.io cookie (written by landing-page on
    // first-touch or by this dashboard's _app.tsx on direct landings).
    // these become /api/auth/login query params which [auth0].ts spreads
    // into auth0 authorizationParams -> post-login action -> backend.
    const cookieAttribution = readAdAttribution();
    for (const k of AD_ATTR_KEYS) {
      const v = searchParams?.get(k) ?? cookieAttribution?.[k];
      if (v) params[k] = v;
    }
    let authUrl = `/api/auth/login?${new URLSearchParams(params)}`;
    if (switchAccount || isExternalAuth) {
      authUrl += "&prompt=login";
    }
    router.push(authUrl);
  }

  // This page depends on information that is only available on the client
  // (whether the app is running in the Replay browser),
  // so we need to disable server rendering to avoid hydration mismatches
  useEffect(() => setIsMounted(true), [setIsMounted]);
  if (!isMounted) {
    return null;
  }

  if (user && !switchAccount && !isExternalAuth) {
    return (
      <AccountSwitcherForm
        name={user.name}
        label={returnTo === "/" ? "Continue to Library" : "Continue with this account"}
        onContinue={() => router.push(returnTo)}
        onSwitch={() => setSwitchAccount(true)}
      />
    );
  } else if (global.__IS_RECORD_REPLAY_RUNTIME__) {
    return <ReplayBrowserLoginForm />;
  } else if (ssoLogin) {
    return (
      <SSOLoginForm
        backToLogin={() => setSSOLogin(false)}
        defaultConnection={defaultConnection}
        onLogin={onLogin}
      />
    );
  } else {
    return (
      <DefaultLoginForm
        onGitHubLogin={() => onLogin(githubConnection)}
        onLogin={() => onLogin(defaultConnection)}
        onEmailLogin={() => onLogin(emailConnection)}
        onSSOLogin={() => setSSOLogin(true)}
      />
    );
  }
}

Page.Layout = LoginLayout;
