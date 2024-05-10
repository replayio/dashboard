import { Button } from "@/components/Button";
import { Message } from "@/components/Message";
import { LoginMessaging } from "@/pageComponents/login/LoginMessaging";
import { requestBrowserLogin } from "@/utils/replayBrowser";

export function ReplayBrowserLoginForm() {
  return (
    <Message className="w-96 p-8 gap-8 text-center">
      <LoginMessaging />
      <Button onClick={requestBrowserLogin} size="large">
        Sign in
      </Button>
    </Message>
  );
}
