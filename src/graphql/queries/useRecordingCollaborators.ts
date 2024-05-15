import {
  GetOwnerAndCollaboratorsQuery,
  GetOwnerAndCollaboratorsQueryVariables,
} from "@/graphql/generated/graphql";
import { WorkspaceRecordingCollaborator } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export function useRecordingCollaborators(recordingId: string) {
  const {
    data,
    error: didError,
    isLoading,
  } = useGraphQLQuery<GetOwnerAndCollaboratorsQuery, GetOwnerAndCollaboratorsQueryVariables>(
    gql`
      query GetOwnerAndCollaborators($recordingId: UUID!) {
        recording(uuid: $recordingId) {
          uuid
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
    `,
    { recordingId }
  );

  const collaborators = useMemo<WorkspaceRecordingCollaborator[] | undefined>(() => {
    if (data) {
      const collaborators: WorkspaceRecordingCollaborator[] = [];
      data?.recording?.collaborators?.edges?.forEach(({ node }) => {
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
      data?.recording?.collaboratorRequests?.edges?.forEach(({ node }) => {
        collaborators.push({
          accessRequested: true,
          collaborationId: node.id,
          name: node.user.name ?? "",
          picture: node.user.picture ?? "",
        });
      });

      return collaborators;
    }
  }, [data]);

  return { collaborators, didError, isLoading };
}
