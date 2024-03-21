import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useUpdateUserPreferences } from "@/graphql/queries/useUpdateUserPreferences";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [isPending, setIsPending] = useState(false);

  const { updateUserPreferences } = useUpdateUserPreferences(() => {
    router.replace("/");
  });

  const setRole = async (role: string) => {
    setIsPending(true);

    updateUserPreferences(role);
  };

  const router = useRouter();

  return (
    <Message>
      <div className="flex flex-row items-center gap-2">
        <ReplayLogo />
        <div className="font-bold text-xl">Can you tell us your role?</div>
      </div>
      <div>(So we can skip stuff you might find boring)</div>
      <div className="flex flex-row gap-2">
        <Button disabled={isPending} onClick={() => setRole("developer")}>
          Developer
        </Button>
        <Button disabled={isPending} onClick={() => setRole("other")}>
          Not a Developer
        </Button>
      </div>
    </Message>
  );
}

Page.Layout = EmptyLayout;
