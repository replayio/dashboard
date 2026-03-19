import { useApolloClient } from "@/components/ApolloContext";
import { ReplayLogo } from "@/components/ReplayLogo";
import { getAuthConnection } from "@/graphql/queries/getAuthConnection";
import { useState } from "react";

export function SSOLoginForm({
  backToLogin,
  defaultConnection,
  onLogin,
}: {
  backToLogin: () => void;
  defaultConnection: string;
  onLogin: (connection: string) => void;
}) {
  const client = useApolloClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | boolean>(false);

  const onSSOLogin = async () => {
    const authConnection = await getAuthConnection(client, email);

    if (authConnection) {
      onLogin(authConnection);
    } else {
      setError(true);
    }
  };

  return (
    <div className="w-[420px] bg-login-card border border-login-card-border rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 text-center">
      <ReplayLogo className="min-w-12 min-h-12" color="#F02D5E" />
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-2xl font-bold text-login-fg my-0">Enterprise SSO</h2>
        <p className="text-login-fg-secondary text-sm mb-0">
          Sign in with your organization&apos;s email
        </p>
      </div>

      {error && (
        <div className="w-full bg-login-error-bg border border-login-error-border text-login-error-text px-4 py-3 rounded-lg text-sm">
          We couldn&apos;t find an SSO provider for your email.
        </div>
      )}

      <div className="flex flex-col gap-2 w-full text-left">
        <label className="text-sm font-medium text-login-fg">Email Address</label>
        <input
          className="w-full px-3 py-2.5 rounded-lg border border-login-input-border bg-login-input-bg text-login-fg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-login-input-focus focus:border-transparent"
          type="email"
          placeholder="Enter your email address..."
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onSSOLogin()}
        />
      </div>

      <button
        onClick={onSSOLogin}
        className="w-full px-4 py-4 text-center rounded-lg bg-login-btn-primary-bg text-login-btn-primary-fg font-medium text-md hover:bg-login-btn-primary-hover transition-colors cursor-pointer"
      >
        Continue with SAML
      </button>

      <button
        className="text-login-fg-secondary text-sm hover:text-login-fg underline transition-colors cursor-pointer"
        onClick={backToLogin}
      >
        Back to login
      </button>
    </div>
  );
}
