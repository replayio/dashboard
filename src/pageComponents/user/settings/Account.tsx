import { Button } from "@/components/Button";
import { COOKIES } from "@/constants";
import { useCurrentUser } from "@/graphql/queries/useCurrentUser";
import { deleteCookieValueClient } from "@/utils/cookie";
import { useState } from "react";

export function Account() {
  const { user } = useCurrentUser();

  const [isPending, setIsPending] = useState(false);

  const onClick = async () => {
    setIsPending(true);

    deleteCookieValueClient(COOKIES.accessToken);

    window.location.replace(`/api/auth/logout?${new URLSearchParams({ origin: location.origin })}`);
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
