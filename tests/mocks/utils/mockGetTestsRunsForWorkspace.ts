import { GetTestsRunsForWorkspaceQuery } from "@/graphql/generated/graphql";
import { TestRun } from "@/graphql/types";
import { DEFAULT_WORKSPACE_ID } from "../constants";

export function mockGetTestsRunsForWorkspace(
  testRun: TestRun,
  workspaceId: string = DEFAULT_WORKSPACE_ID
): GetTestsRunsForWorkspaceQuery {
  return {
    node: {
      __typename: "Workspace",
      id: workspaceId,
      testRuns: {
        __typename: "TestRunConnection",
        edges: [
          {
            __typename: "TestRunEdge",
            node: {
              __typename: "TestRun",
              id: testRun.id,
              date: testRun.date.toISOString(),
              mode: null,
              results: {
                __typename: "TestRunResults",
                counts: {
                  __typename: "TestRunStats",
                  failed: testRun.numFailed,
                  flaky: testRun.numFlaky,
                  passed: testRun.numPassed,
                },
              },
              source: {
                __typename: "TestRunSource",
                commitId: testRun.commitId,
                commitTitle: testRun.commitTitle,
                groupLabel: testRun.groupLabel,
                isPrimaryBranch: testRun.isPrimaryBranch,
                branchName: testRun.branchName,
                prNumber: testRun.prNumber,
                prTitle: testRun.prTitle,
                repository: testRun.repository,
                triggerUrl: testRun.triggerUrl,
                user: testRun.user,
              },
            },
          },
        ],
      },
    },
  };
}
