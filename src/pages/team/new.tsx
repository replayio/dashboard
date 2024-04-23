import { Button } from "@/components/Button";
import { EmptyLayout } from "@/components/EmptyLayout";
import { Input } from "@/components/Input";
import { Message } from "@/components/Message";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useCreateWorkspace } from "@/graphql/queries/createWorkspace";
import assert from "assert";
import { getPlanKey } from "@/utils/test-suites";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectTeamType from "@/pageComponents/team/layout/SelectTeamType";

export default function Page({ type }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isOrg = type === "org";

  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");
  const [teamType, setTeamType] = useState<"testsuite" | "standard">("testsuite");

  const router = useRouter();

  const { createWorkspace, error } = useCreateWorkspace(
    id => {
      router.replace(`/team/${id}/recordings`);
    },
    () => {
      setIsPending(false);
    }
  );

  const createTeam = async () => {
    if (name.trim()) {
      setIsPending(true);
      createWorkspace(name, getPlanKey({ isOrg, teamType }));
    }
  };

  return (
    <Message className={`${isOrg ? "" : "min-h-[330px]"} max-w-[400px] justify-between p-6`}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <ReplayLogo />
          <div className="font-bold text-xl">Welcome to Replay!</div>
        </div>
        <div>What would you like your {isOrg ? "organization" : "team"} name to be?</div>
        <div className="w-full">
          <Input
            className="w-full"
            disabled={isPending}
            onChange={name => setName(name)}
            onConfirm={createTeam}
            placeholder="Your company name"
          />
        </div>
        {!isOrg && <SelectTeamType setTeamType={setTeamType} teamType={teamType} />}
        {error && (
          <div
            className="bg-rose-400 text-rose-900 px-2 py-1 rounded font-bold inline-block"
            role="alert"
          >
            {error.message}
          </div>
        )}
      </div>
      <div>
        <Button className="text-center" disabled={isPending} onClick={createTeam}>
          Create {isOrg ? "an organization" : "a team"}
        </Button>
      </div>
    </Message>
  );
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext<{
  type?: string;
}>) {
  const { type } = query;

  assert(!Array.isArray(type));

  return {
    props: {
      type: type ?? null,
    },
  };
}
