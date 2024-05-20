import {
  GetWorkspaceMemberRolesQuery,
  GetWorkspaceMemberRolesQueryVariables,
} from "@/graphql/generated/graphql";
import { graphQLQuery } from "@/graphql/graphQLQuery";
import { gql } from "@apollo/client";
import { MockGraphQLData } from "tests/mocks/types";

type MemberRoles = { id: string; roles: string[] };

export async function getWorkplaceMemberRoles(
  workspaceId: string,
  accessToken: string,
  mockGraphQLData: MockGraphQLData | null
): Promise<MemberRoles[]> {
  const { data, errors } = await graphQLQuery<
    GetWorkspaceMemberRolesQuery,
    GetWorkspaceMemberRolesQueryVariables
  >({
    accessToken,
    mockGraphQLData,
    query: gql`
      query GetWorkspaceMemberRoles($workspaceId: ID!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            members {
              edges {
                node {
                  ... on WorkspaceUserMember {
                    __typename
                    id
                    roles
                    user {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { workspaceId },
  });

  if (errors && errors.length > 0) {
    throw new Error(errors[0]?.message);
  }

  const members: Array<MemberRoles> = [];

  if (data?.node && "members" in data?.node && data.node.members) {
    data.node.members.edges.forEach(({ node }: any) => {
      if ("user" in node) {
        members.push({
          id: node.user.id,
          roles: node.roles,
        });
      }
    });
  }
  return members;
}
