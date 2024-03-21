import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { Input } from "@/components/Input";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");

  const router = useRouter();

  const { createWorkspace, error } = useCreateWorkspace(
    (id) => {
      router.replace(`/team/${id}/recordings`);
    },
    () => {
      setIsPending(false);
    }
  );

  const createTeam = async () => {
    if (name.trim()) {
      setIsPending(true);
      createWorkspace(name, "team-v1");
    }
  };

  return (
    <Message>
      <div className="flex flex-row items-center gap-2">
        <ReplayLogo />
        <div className="font-bold text-xl">Welcome to Replay!</div>
      </div>
      <div>What would you like your team name to be?</div>
      <Input
        className="w-full"
        disabled={isPending}
        onChange={(event) => setName(event.currentTarget.value)}
        onConfirm={createTeam}
        placeholder="Your company name"
      />
      {error && (
        <div
          className="bg-rose-400 text-rose-900 px-2 py-1 rounded font-bold inline-block"
          role="alert"
        >
          {error.message}
        </div>
      )}
      <div>
        <Button
          className="text-center"
          disabled={isPending}
          onClick={createTeam}
        >
          Create an organization
        </Button>
      </div>
    </Message>
  );
}

Page.Layout = EmptyLayout;
