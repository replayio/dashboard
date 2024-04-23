import { redirectWithState } from "@/utils/redirectWithState";
import assert from "assert";
import { GetServerSidePropsContext } from "next";

// TODO [PRO-9]
// TODO [PRO-256]
// Remove this route once the Test Suites GitHub bot URL format has been updated

export default function Page() {
  return null;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string; runId: string }>
) {
  const workspaceId = context.params?.id;
  const runId = context.params?.runId;

  assert(workspaceId, "workspaceId is required");
  assert(runId, "runId is required");

  return redirectWithState({
    context,
    params: { testRunId: runId },
    pathname: `/team/${workspaceId}/runs`,
  });
}
