"use client";

import { Button } from "@/components/Button";
import { LOCAL_STORAGE } from "@/constants";
import { User } from "@/graphql/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export function Account({ user }: { user: User }) {
  const [isPending, setIsPending] = useState(false);

  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    LOCAL_STORAGE.accessToken,
    null
  );

  const { loginWithRedirect, logout } = useAuth0();

  const onClick = async () => {
    setIsPending(true);

    setAccessToken(null);

    await logout();
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        Signed in as <span className="font-bold">{user.name}</span>
      </div>
      <div>
        <Button disabled={isPending} onClick={onClick}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
