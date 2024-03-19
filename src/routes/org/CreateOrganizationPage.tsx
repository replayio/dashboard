import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateOrganizationPage() {
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
    <div className="bg-slate-800 text-white flex flex-col gap-4 p-4 rounded-md min-w-96">
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
    </div>
  );
}
