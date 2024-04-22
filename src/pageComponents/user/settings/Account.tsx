import { Button } from "@/components/Button";
import { SessionContext } from "@/components/SessionContext";
import { COOKIES } from "@/constants";
import { deleteCookieValueClient } from "@/utils/cookie";
import { setAccessTokenInBrowserPrefs } from "@/utils/replayBrowser";
import { useContext, useState } from "react";

export function Account() {
  const { user } = useContext(SessionContext);

  const [isPending, setIsPending] = useState(false);

  const onClick = async () => {
    setIsPending(true);

    setAccessTokenInBrowserPrefs(null);
    deleteCookieValueClient(COOKIES.accessToken);

    window.location.replace(
      `/api/auth/logout?${new URLSearchParams({ origin: location.origin })}`
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        Signed in as <span className="font-bold">{user?.name}</span>
      </div>
      <div>
        <Button disabled={isPending} onClick={onClick}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
