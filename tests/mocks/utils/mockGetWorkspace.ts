import { GetWorkspaceQuery } from "@/graphql/generated/graphql";
import { Workspace } from "@/graphql/types";
import { DEFAULT_WORKSPACE_ID } from "tests/mocks/constants";

export function mockGetWorkspace(partial: Partial<Workspace>): GetWorkspaceQuery {
  return {
    node: {
      __typename: "Workspace",
      id: partial.id ?? DEFAULT_WORKSPACE_ID,
      isOrganization: partial.isOrganization ?? false,
      isTest: partial.isTest ?? false,
      retentionLimit: partial.retentionLimitDays,
    },
  };
}
