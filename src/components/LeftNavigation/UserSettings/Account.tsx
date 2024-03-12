"use client";

import { Button } from "@/components/Button";
import { User } from "@/graphql/types";
import { useState } from "react";

export function Account({ user }: { user: User }) {
  const [isPending, setIsPending] = useState(false);

  const onClick = async () => {
    setIsPending(true);

    window.location.replace("/api/auth/logout");
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
