import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useAuthenticationStatus } from "@/pageComponents/browser/authenticated/hooks/useAuthenticationStatus";
import { ReactNode } from "react";

export function ConfirmCLIAuthentication({ browserAuth }: { browserAuth: string | undefined }) {
  const status = useAuthenticationStatus(browserAuth);

  let title: ReactNode;
  let message: ReactNode;

  switch (status) {
    case "failed": {
      title = "Authentication Failed";
      message = (
        <>
          <div>Something may have gone wrong.</div>
          <div>Please close the page and try again.</div>
        </>
      );
      break;
    }
    case "finished": {
      title = "Authentication Complete";
      message = (
        <>
          <div>You have successfully logged in.</div>
          <div>You may close this window.</div>
        </>
      );
      break;
    }
    case "pending": {
      title = "Authenticating...";
      message = <div>Please wait while we finish signing you in.</div>;
      break;
    }
  }

  return (
    <Message className="w-96 p-8 gap-8 text-center">
      <ReplayLogo className="text-white min-w-20 min-h-20" />
      <div className="font-bold text-xl">{title}</div>
      <div>{message}</div>
    </Message>
  );
}
