import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
import { GoogleLogo } from "@/pageComponents/login/GoogleLogo";
import { LoginMessaging } from "@/pageComponents/login/LoginMessaging";

const defaultConnection = "google-oauth2";

export function DefaultLoginForm({
  onLogin,
  onSSOLogin,
}: {
  onLogin: () => void;
  onSSOLogin: () => void;
}) {
  return (
    <Message className="w-96 p-8 gap-8 text-center">
      <LoginMessaging />
      <Button onClick={onLogin} size="large">
        <GoogleLogo /> Continue with Google
      </Button>
      <div className="flex flex-col gap-4 w-full items-center">
        <div className="text-sm flex flex-row items-center gap-2 w-9/12">
          <hr className="h-px bg-slate-600 border-0 grow" />
          Enterprise Users
          <hr className="h-px bg-slate-600 border-0 grow" />
        </div>
        <Button onClick={onSSOLogin} size="large" variant="outline">
          Continue with SAML SSO
        </Button>
      </div>
    </Message>
  );
}
