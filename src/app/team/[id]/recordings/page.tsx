import { RecordingsPage } from "@/app/team/[id]/recordings/RecordingsPage";
import { TestSuitesPage } from "@/app/team/[id]/recordings/TestSuitesPage";
import { PAGE_SIZE } from "@/app/team/[id]/recordings/shared";
import { getNonPendingWorkspacesServer } from "@/graphql/queries/getNonPendingWorkspaces";
import assert from "assert";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    filter?: string;
    limit?: number;
    testRunId?: string;
  };
}) {
  const id = decodeURIComponent(params.id);

  let isTestWorkspace = false;
  if (id !== "me") {
    const workspaces = await getNonPendingWorkspacesServer();
    const workspace = workspaces.find((workspace) => workspace.id === id);
    assert(workspace, `Workspace "${id}" not found`);

    isTestWorkspace = workspace.isTest;
  }

  if (isTestWorkspace) {
    return (
      <TestSuitesPage
        testRunId={searchParams.testRunId ?? null}
        workspaceId={id}
      />
    );
  } else {
    return (
      <RecordingsPage
        filter={searchParams.filter ?? ""}
        id={id}
        limit={searchParams.limit ?? PAGE_SIZE}
      />
    );
  }
}
