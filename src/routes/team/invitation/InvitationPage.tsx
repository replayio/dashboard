import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SessionContext } from "@/components/SessionContext";
import { getWorkspace } from "@/graphql/queries/getWorkspaceType";
import { useClaimTeamInvitationCode } from "@/graphql/queries/useClaimTeamInvitationCode";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export function InvitationPage({ code }: { code: string | null }) {
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
    <div className="bg-slate-800 text-white flex flex-col p-2 rounded-md">
      <LoadingSpinner label="Processing..." />
    </div>
  );
}
