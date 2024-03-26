import { GetWorkspaceTestExecutionsQuery } from "@/graphql/generated/graphql";
import { TestSuiteTestExecution } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
import { DEFAULT_WORKSPACE_ID } from "../constants";
import { getUID } from "./getUID";
import { partialToTestSuiteTestExecutionRecording } from "./partialToTestSuiteTestExecutionRecording";

export function mockGetWorkspaceTestExecutions(
  partials: Partial<
    Omit<TestSuiteTestExecution, "stats"> & {
      recordings?: Partial<TestSuiteTestExecution["recordings"]>;
    }
  >[],
  workspaceId: string = DEFAULT_WORKSPACE_ID
): GetWorkspaceTestExecutionsQuery {
  return {
    node: {
      __typename: "Workspace",
      id: workspaceId,
      tests: {
        __typename: "TestsConnection",
        edges: partials.map((partial) => {
          const {
            commitAuthor = "fake-user",
            commitTitle = "Test commit title",
            createdAt = getRelativeDate({ hoursAgo: 1 }),
            errors = [],
            id = getUID("test-execution-id"),
            recordings = [partialToTestSuiteTestExecutionRecording()],
            result = "passed",
          } = partial;

          return {
            __typename: "TestsEdge",
            node: {
              __typename: "Tests",
              executions: [
                {
                  __typename: "TestExecution",
                  testRunId: id,
                  errors: errors,
                  createdAt: createdAt.toISOString(),
                  commitTitle,
                  commitAuthor,
                  result,
                  recordings: recordings.map((recording) => ({
                    __typename: "Recording",
                    buildId: recording.buildId,
                    id: recording.id,
                    uuid: recording.id,
                    title: recording.title,
                    isProcessed: recording.isProcessed,
                    duration: recording.duration,
                    createdAt: recording.createdAt.toISOString(),
                  })),
                },
              ],
            },
          };
        }),
      },
    },
  };
}
