import { Button } from "@/components/Button";
import { SessionContext } from "@/components/SessionContext";
import { ThemeSwitch } from "@/components/ThemeSwitch";
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
    deleteCookieValueClient(COOKIES.defaultPathname);
    deleteCookieValueClient(COOKIES.accessToken);

    window.location.replace(`/api/auth/logout?${new URLSearchParams({ origin: location.origin })}`);
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between py-4 border-b border-border">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">Account</div>
          <div className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{user.name}</span> (
            {user.email})
          </div>
        </div>
        <Button disabled={isPending} onClick={onClick} variant="outline" size="small">
          Sign out
        </Button>
      </div>
      <ThemeSwitch />
    </div>
  );
}
