import { confirmAuthRequestClaimed } from "@/graphql/queries/confirmAuthRequestClaimed";
import { useEffect, useState } from "react";

type Status = "pending" | "failed" | "finished";

// The CLI polls for authentication status every 2.5 seconds
// This hook should show a failure status as soon as possible but it's important we avoid a false positive
const POLL_INTERVAL = 1_000;
const MAX_ATTEMPTS = 8;

export function useAuthenticationStatus(key: string | undefined): Status {
  const [status, setStatus] = useState<Status>(key ? "pending" : "finished");

  // Poll for confirmation that the CLI was still listening and claimed the authentication session
  useEffect(() => {
    if (key) {
      let attemptsRemaining = MAX_ATTEMPTS;
      let timeout: NodeJS.Timeout;

      let pollForStatus = async () => {
        const authRequestHasBeenClaimed = await confirmAuthRequestClaimed(key);
        if (authRequestHasBeenClaimed) {
          setStatus("finished");
        } else {
          if (--attemptsRemaining <= 0) {
            setStatus("failed");
          } else {
            timeout = setTimeout(pollForStatus, POLL_INTERVAL);
          }
        }
      };

      pollForStatus();

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [key]);

  return status;
}
