import {
  GetTestsQuery,
  GetTestsRunsForWorkspaceQuery,
  GetWorkspaceMembersQuery,
  GetWorkspaceTestExecutionsQuery,
  GetWorkspaceTestsQuery,
} from "@/graphql/generated/graphql";

export type MockData = {
  // Used by /team/[id]/runs
  GetTests?: GetTestsQuery;
  GetTestsRunsForWorkspace?: GetTestsRunsForWorkspaceQuery;

  // Used by /team/[id]/tests
  GetWorkspaceTestExecutions?: GetWorkspaceTestExecutionsQuery;
  GetWorkspaceTests?: GetWorkspaceTestsQuery;

  // Team settings
  GetWorkspaceMembers?: GetWorkspaceMembersQuery;
};

export type MockDataKey = keyof MockData;
