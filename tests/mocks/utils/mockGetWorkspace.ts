import { GetWorkspaceQuery } from "@/graphql/generated/graphql";
import { Workspace } from "@/graphql/types";
import { DEFAULT_WORKSPACE_ID } from "tests/mocks/constants";
import { MockGraphQLResponse } from "tests/mocks/types";

export function mockGetWorkspace(
  partial: Partial<Workspace>
): MockGraphQLResponse<GetWorkspaceQuery> {
  return {
    data: {
      node: {
        __typename: "Workspace",
        id: partial.id ?? DEFAULT_WORKSPACE_ID,
        isOrganization: partial.isOrganization ?? false,
        isTest: partial.isTest ?? false,
        retentionLimit: partial.retentionLimitDays,
      },
    },
  };
}
