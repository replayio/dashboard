import { AuthContext } from "@/components/AuthContext";
import {
  GetOwnerAndCollaboratorsQuery,
  GetOwnerAndCollaboratorsQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { WorkspaceRecordingCollaborator } from "@/graphql/types";
import { gql, useQuery } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

const QUERY = gql`
  query GetOwnerAndCollaborators($recordingId: UUID!) {
    recording(uuid: $recordingId) {
      collaborators {
        edges {
          node {
            ... on RecordingPendingEmailCollaborator {
              id
              email
              createdAt
            }
            ... on RecordingPendingUserCollaborator {
              id
              user {
                name
                picture
              }
            }
            ... on RecordingUserCollaborator {
              id
              user {
                name
                picture
              }
            }
          }
        }
      }
      collaboratorRequests {
        edges {
          node {
            ... on RecordingCollaboratorRequest {
              id
              user {
                name
                picture
              }
            }
          }
        }
      }
    }
  }
`;

export function useRecordingCollaborators(
  recordingId: string
): WorkspaceRecordingCollaborator[] {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const response = useQuery<
    GetOwnerAndCollaboratorsQuery,
    GetOwnerAndCollaboratorsQueryVariables
  >(QUERY, {
    client,
    variables: { recordingId },
  });

  const collaborators: WorkspaceRecordingCollaborator[] = [];
  response.data?.recording?.collaborators?.edges?.forEach(({ node }) => {
    switch (node.__typename) {
      case "RecordingPendingEmailCollaborator": {
        collaborators.push({
          accessRequested: false,
          collaborationId: node.id,
          name: node.email ?? "",
          picture: "",
        });
        break;
      }
      case "RecordingPendingUserCollaborator":
      case "RecordingUserCollaborator": {
        collaborators.push({
          accessRequested: false,
          collaborationId: node.id,
          name: node.user.name ?? "",
          picture: node.user.picture ?? "",
        });
        break;
      }
    }
  });
  response.data?.recording?.collaboratorRequests?.edges?.forEach(({ node }) => {
    collaborators.push({
      accessRequested: true,
      collaborationId: node.id,
      name: node.user.name ?? "",
      picture: node.user.picture ?? "",
    });
  });

  return collaborators;
}
