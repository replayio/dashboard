import { GetWorkspaceMembershipRequestsQuery } from "@/graphql/generated/graphql";
import { WorkspaceMember } from "@/graphql/types";
import { MockGraphQLResponse } from "tests/mocks/types";
import { DEFAULT_USER_ID, DEFAULT_WORKSPACE_ID } from "../constants";

export function mockGetWorkspaceMembershipRequests(
  partialMembers: Partial<WorkspaceMember>[],
  workspaceId: string = DEFAULT_WORKSPACE_ID
): MockGraphQLResponse<GetWorkspaceMembershipRequestsQuery> {
  return {
    data: {
      node: {
        __typename: "Workspace",
        id: workspaceId,
        membershipRequests: {
          __typename: "WorkspaceMembershipRequestConnection",
          edges: partialMembers.map(
            ({ id = DEFAULT_USER_ID, name = "Test User", picture = "" }) => ({
              __typename: "WorkspaceMembershipRequestEdge",
              node: {
                __typename: "WorkspaceMembershipRequest",
                id,
                user: {
                  __typename: "User",
                  id,
                  name,
                  picture,
                },
              },
            })
          ),
        },
      },
    },
  };
}