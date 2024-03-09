import {
  GetMyRecordingsQuery,
  GetMyRecordingsQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { WorkspaceRecording } from "@/graphql/types";
import { gql } from "@apollo/client";
import assert from "assert";

export async function getPersonalRecordingsServer(
  filter: string = ""
): Promise<WorkspaceRecording[]> {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<
    GetMyRecordingsQuery,
    GetMyRecordingsQueryVariables
  >({
    query: gql`
      query GetMyRecordings($filter: String) {
        viewer {
          recordings(filter: $filter) {
            edges {
              node {
                buildId
                duration
                comments {
                  user {
                    id
                  }
                }
                createdAt
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
    `,
    variables: { filter },
  });

  assert(
    response.data?.viewer?.recordings,
    "Personal recordings could not be loaded"
  );

  return response.data.viewer.recordings.edges.map(({ node }) => ({
    buildId: node.buildId ?? "",
    createdAt: new Date(`${node.createdAt}`),
    duration: node.duration || 0,
    numComments: node.comments?.length ?? 0,
    owner: node.owner
      ? {
          id: node.owner.id,
          name: node.owner.name || "",
          picture: node.owner.picture || "",
        }
      : null,
    private: node.private,
    title: node.title || "",
    url: node.url || "",
    userRole: node.userRole,
    uuid: node.uuid || "",
  }));
}
