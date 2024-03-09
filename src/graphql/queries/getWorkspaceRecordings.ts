import {
  GetWorkspaceRecordingsQuery,
  GetWorkspaceRecordingsQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { WorkspaceRecording } from "@/graphql/types";
import { gql } from "@apollo/client";
import assert from "assert";

export async function getWorkspaceRecordingsServer(
  id: string,
  filter: string = ""
): Promise<WorkspaceRecording[]> {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<
    GetWorkspaceRecordingsQuery,
    GetWorkspaceRecordingsQueryVariables
  >({
    query: gql`
      query GetWorkspaceRecordings($id: ID!, $filter: String) {
        node(id: $id) {
          ... on Workspace {
            id
            recordings(filter: $filter) {
              edges {
                node {
                  buildId
                  comments {
                    user {
                      id
                    }
                  }
                  createdAt
                  duration
                  metadata
                  owner {
                    id
                    name
                    picture
                  }
                  private
                  title
                  url
                  userRole
                  uuid
                }
              }
            }
          }
        }
      }
    `,
    variables: { id, filter },
  });

  assert(
    response.data?.node &&
      "recordings" in response.data?.node &&
      response.data.node.recordings?.edges,
    `Recordings could not be loaded for id "${id}"`
  );

  return response.data.node.recordings.edges.map(({ node }) => ({
    buildId: node.buildId ?? "",
    createdAt: new Date(`${node.createdAt}`),
    duration: node.duration ?? 0,
    numComments: node.comments?.length ?? 0,
    owner: node.owner
      ? {
          id: node.owner.id,
          name: node.owner.name ?? "",
          picture: node.owner.picture ?? "",
        }
      : null,
    private: node.private,
    title: node.title ?? "",
    url: node.url ?? "",
    userRole: node.userRole,
    uuid: node.uuid ?? "",
  }));
}
