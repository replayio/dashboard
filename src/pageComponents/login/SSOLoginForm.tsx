import { useApolloClient } from "@/components/ApolloContext";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Message } from "@/components/Message";
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
    <Message className="w-96 text-center p-8 gap-8">
      <ReplayLogo className="text-white min-w-20 min-h-20" />
      <div className="flex flex-col items-center gap-2 w-9/12">
        <div className="text-lg mb-2">Sign in with your email</div>
        {error && (
          <div className="bg-rose-600 text-white px-2 py-1 rounded">
            We couldn&apos;t find an SSO provider for your email.
          </div>
        )}
        <Input
          className="w-full"
          type="email"
          placeholder="Enter your email address..."
          value={email}
          onConfirm={onSSOLogin}
          onChange={value => setEmail(value)}
        />
        <Button onClick={onSSOLogin} size="large">
          Continue with SAML
        </Button>
      </div>

      <button className="text-white underline" onClick={backToLogin}>
        Back to login
      </button>
    </Message>
  );
}
