import { EmptyLayout } from "@/components/EmptyLayout";
import { SessionContext } from "@/components/SessionContext";
import { AccountSwitcherForm } from "@/pageComponents/login/AccountSwitcherForm";
import { DefaultLoginForm } from "@/pageComponents/login/DefaultLoginForm";
import { ReplayBrowserLoginForm } from "@/pageComponents/login/ReplayBrowserLoginForm";
import { SSOLoginForm } from "@/pageComponents/login/SSOLoginForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const defaultConnection = "google-oauth2";

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
    let authUrl = `/api/auth/login?${new URLSearchParams({
      connection,
      returnTo,
      origin: location.origin,
    })}`;
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
        onLogin={() => onLogin(defaultConnection)}
        onSSOLogin={() => setSSOLogin(true)}
      />
    );
  }
}

Page.Layout = EmptyLayout;
