import { EmptyLayout } from "@/components/EmptyLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Message } from "@/components/Message";
import { SessionContext } from "@/components/SessionContext";
import { getWorkspace } from "@/graphql/queries/getWorkspaceType";
import { useClaimTeamInvitationCode } from "@/graphql/queries/useClaimTeamInvitationCode";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page({
  code,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { accessToken } = useContext(SessionContext);
  const router = useRouter();

  const { claimInvitation, error, isLoading } = useClaimTeamInvitationCode(
    async (workspaceId: string) => {
      const { isTest } = await getWorkspace(accessToken, workspaceId);

      router.replace(
        isTest ? `/team/${workspaceId}/runs` : `/team/${workspaceId}/recordings`
      );
    }
  );

  useEffect(() => {
    if (code) {
      claimInvitation(code);
    }
  }, [claimInvitation, code]);

  if (error || !code) {
    return (
      <div className="bg-red-600 text-white flex flex-col p-2 rounded-md">
        {!code
          ? "Invalid invitation code"
          : error?.message ?? "An error occurred"}
      </div>
    );
  }

  return (
    <Message>
      <LoadingSpinner label="Processing..." />
    </Message>
  );
}

Page.Layout = EmptyLayout;

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext<{ code: string }>) {
  const { code } = query;

  return {
    props: {
      code: (Array.isArray(code) ? code[0] : code) ?? null,
    },
  };
}
