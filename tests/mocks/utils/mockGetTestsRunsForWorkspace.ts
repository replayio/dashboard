import { GetTestsRunsForWorkspaceQuery } from "@/graphql/generated/graphql";
import { TestRun } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
import { MockGraphQLResponse } from "tests/mocks/types";
import { DEFAULT_WORKSPACE_ID } from "../constants";
import { getUID } from "./getUID";

export function mockGetTestsRunsForWorkspace(
  testRuns: Array<Partial<TestRun>>,
  workspaceId: string = DEFAULT_WORKSPACE_ID
): MockGraphQLResponse<GetTestsRunsForWorkspaceQuery> {
  return {
    data: {
      node: {
        __typename: "Workspace",
        id: workspaceId,
        testRuns: {
          __typename: "TestRunConnection",
          edges: testRuns.map(testRun => {
            const {
              branchName = "main",
              commitId = getUID("commit"),
              commitTitle = "Fake commit title",
              date = getRelativeDate({ minutesAgo: 1 }),
              groupLabel = null,
              id = getUID("test-run"),
              isPrimaryBranch = true,
              numFailed = 0,
              numFlaky = 0,
              numPassed = 0,
              prNumber = null,
              prTitle = null,
              repository = null,
              triggerUrl = "https://fake-trigger-url.com",
              user = null,
            } = testRun;

            return {
              __typename: "TestRunEdge",
              node: {
                __typename: "TestRun",
                id,
                date: date.toISOString(),
                mode: null,
                results: {
                  __typename: "TestRunResults",
                  counts: {
                    __typename: "TestRunStats",
                    failed: numFailed,
                    flaky: numFlaky,
                    passed: numPassed,
                  },
                },
                source: {
                  __typename: "TestRunSource",
                  branchName,
                  commitId,
                  commitTitle,
                  groupLabel,
                  isPrimaryBranch,
                  prNumber,
                  prTitle,
                  repository,
                  triggerUrl,
                  user,
                },
              },
            };
          }),
        },
      },
    },
  };
}
