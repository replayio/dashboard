import { GetWorkspaceTestsQuery } from "@/graphql/generated/graphql";
import { TestSuiteTestSummary } from "@/graphql/types";
import { DEFAULT_WORKSPACE_ID } from "../constants";
import { getUID } from "./getUID";

export function mockGetWorkspaceTests(
  partials: Partial<
    Omit<TestSuiteTestSummary, "stats"> & {
      stats?: Partial<TestSuiteTestSummary["stats"]>;
    }
  >[],
  workspaceId: string = DEFAULT_WORKSPACE_ID
): GetWorkspaceTestsQuery {
  return {
    node: {
      __typename: "Workspace",
      id: workspaceId,
      tests: {
        __typename: "TestsConnection",
        edges: partials.map(partial => {
          const {
            id = getUID("test-summary-id"),
            scope = [],
            stats,
            title = "Fake test",
          } = partial;
          const {
            failed = 0,
            failureRate = 0,
            flaky = 0,
            flakyRate = 0,
            passed = 100,
            skipped = 0,
            unknown = 0,
          } = stats ?? {};

          return {
            __typename: "TestsEdge",
            node: {
              __typename: "Tests",
              testId: id,
              title: title,
              scope: scope,
              stats: {
                __typename: "TestsStats",
                failed,
                failureRate,
                flaky,
                flakyRate,
                passed,
                skipped,
                unknown,
              },
            },
          };
        }),
      },
    },
  };
}
