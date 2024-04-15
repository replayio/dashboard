import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { ExternalLink } from "@/components/ExternalLink";
import { Input } from "@/components/Input";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import { getAuthConnection } from "@/graphql/queries/getAuthConnection";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const defaultConnection = "google-oauth2";

function DefaultLogin({ onLogin, onSSOLogin }: { onLogin: () => void; onSSOLogin: () => void }) {
  return (
    <Message className="max-w-96 p-8 gap-8 text-center">
      <ReplayLogo className="text-white min-w-20 min-h-20" />
      <div>
        Replay captures everything you need for the perfect bug report, all in
        one link.
        <br />
        <ExternalLink className="text-sm mt-2" href="https://www.replay.io">
          Learn more
        </ExternalLink>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={onLogin} size="large">
          Sign in with Google
        </Button>
        <Button onClick={onSSOLogin} size="large" variant="outline">
          Enterprise Users:<br/>
          Sign in with SSO
        </Button>
      </div>
    </Message>
  );
}

function SSOLogin({ onLogin }: { onLogin: (connection: string) => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | boolean>(false);

  const onSSOLogin = async () => {
    const authConnection = await getAuthConnection(email);

    if (authConnection) {
      onLogin(authConnection);
    } else {
      setError(true);
    }
  };

  return (
    <Message className="max-w-96 text-center">
      <ReplayLogo className="text-white min-w-20 min-h-20" />
      <div>
        Enter your email to be redirected to your SSO provider.
      </div>
      {error && (
        <div className="bg-rose-600 text-white px-2 py-1 rounded">
          We couldn&apos;t find an SSO provider for your email.
        </div>
      )}
      <div className="flex flex-row space-x-3">
        <Input
          type="email"
          placeholder="user@company.com"
          value={email}
          onConfirm={onSSOLogin}
          onChange={value => setEmail(value)}
        />
        <Button onClick={onSSOLogin} size="large">
          Sign in
        </Button>
      </div>
      <Button onClick={() => onLogin(defaultConnection)} size="large" variant="outline">
        Sign in with Google
      </Button>
    </Message>
  );
}

function SwitchAccountMessage({ name, label, onContinue, onSwitch }: {
  name: string;
  label: string;
  onContinue: () => void;
  onSwitch: () => void;
}) {
  return (
    <Message className="max-w-96 p-8 gap-8 text-center">
      <ReplayLogo className="text-white min-w-20 min-h-20" />
      <div>
        You are already logged in as <strong>{name}</strong>.
      </div>
      <Button onClick={onContinue} size="large">
        {label}
      </Button>
      {
      globalThis.__IS_RECORD_REPLAY_RUNTIME__ || (
        <Button onClick={onSwitch} size="large" variant="outline">
          Switch accounts
        </Button>
      )
      }
    </Message>
  );
}

export default function Page({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get("returnTo") || "/";
  const [switchAccount, setSwitchAccount] = useState(false);
  const [ssoLogin, setSSOLogin] = useState(false);

  function onLogin(connection: string) {
    let authUrl = `/api/auth/login?${new URLSearchParams({ connection, returnTo, origin: location.origin })}`;
    if (switchAccount) {
      authUrl += "&prompt=login";
    }
    router.push(authUrl);
  }

  if (user && !switchAccount) {
    return (
      <SwitchAccountMessage
        name={user.name}
        label={returnTo === "/" ? "Continue to Library" : "Continue with this account"}
        onContinue={() => router.push(returnTo)}
        onSwitch={() => setSwitchAccount(true)}
      />
    );
  } else if (ssoLogin) {
    return <SSOLogin onLogin={onLogin} />;
  } else {
    return (
      <DefaultLogin
        onLogin={() => onLogin(defaultConnection)}
        onSSOLogin={() => setSSOLogin(true)}
      />
    );
  }
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getSession(req, res);

  return { props: { user: session?.user ?? null } };
}
