import { Button } from "@/components/Button";
import { ReplayLogo } from "@/components/ReplayLogo";
import { useRequestWorkspaceMembership } from "@/graphql/queries/useRequestWorkspaceMembership";
import Link from "next/link";
import { useState } from "react";

export default function Page({ workspaceId }: { workspaceId: string }) {
  const { error, isLoading, requestWorkspaceMembership } = useRequestWorkspaceMembership();

  const [status, setStatus] = useState<"initial" | "pending" | "failed" | "success">("initial");

  const requestAccess = async () => {
    setStatus("pending");
    try {
      await requestWorkspaceMembership(workspaceId);
      setStatus("success");
    } catch {
      setStatus("failed");
    }
  };

  let buttonDisabled = isLoading;
  let buttonLabel = "";
  switch (status) {
    case "pending":
      buttonDisabled = true;
      buttonLabel = "Requesting...";
      break;
    case "failed":
      buttonLabel = "Request access";
      break;
    case "success":
      buttonDisabled = true;
      buttonLabel = "Request sent";
      break;
    default:
      buttonLabel = "Request access";
      break;
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center p-4">
      <div className="flex flex-row gap-4 items-center">
        <ReplayLogo className="text-slate-500 min-w-12 min-h-12" />
        <div className="text-2xl font-bold">Sorry, you don&apos;t have permission!</div>
      </div>
      <div>Maybe you haven&apos;t been invited to this team yet?</div>
      <div className="flex flex-row gap-2">
        <Link href="/home">
          <Button data-test-id="Button-GoHome" size="large" variant="outline">
            Go home
          </Button>
        </Link>
        <Button
          data-test-id="Button-RequestAccess"
          color="primary"
          disabled={buttonDisabled}
          onClick={requestAccess}
          size="large"
        >
          {buttonLabel}
        </Button>
      </div>
      {error && <div className="text-rose-500 text-sm">{error.message}</div>}
    </div>
  );
}
