import { RecordingsPage } from "@/app/team/[id]/recordings/Recordings/RecordingsPage";
import { TestSuitesPage } from "@/app/team/[id]/recordings/TestSuite/TestSuitesPage";
import { PAGE_SIZE } from "@/app/team/[id]/recordings/Recordings/shared";
import { getNonPendingWorkspacesServer } from "@/graphql/queries/getNonPendingWorkspaces";
import assert from "assert";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    recordingFilter?: string;
    recordingLimit?: number;
    testFilter?: string;
    testId?: string;
    testRunBranch?: string;
    testRunFilter?: string;
    testRunId?: string;
    testRunStatus?: string;
    testStatus?: string;
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
        testFilter={searchParams.testFilter ?? ""}
        testId={searchParams.testId ?? null}
        testRunBranch={searchParams.testRunBranch ?? ""}
        testRunFilter={searchParams.testRunFilter ?? ""}
        testRunId={searchParams.testRunId ?? null}
        testRunStatus={searchParams.testRunStatus ?? ""}
        testStatus={searchParams.testStatus ?? ""}
        workspaceId={id}
      />
    );
  } else {
    return (
      <RecordingsPage
        filter={searchParams.recordingFilter ?? ""}
        id={id}
        limit={searchParams.recordingLimit ?? PAGE_SIZE}
      />
    );
  }
}
