import {
  GetWorkspaceRecordingsQuery,
  GetWorkspaceRecordingsQueryVariables,
} from "@/graphql/generated/graphql";
import { WorkspaceRecording } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

// TODO limit the number of recordings returned
export function useWorkspaceRecordings(id: string, filter: string = "") {
  const {
    data,
    error: didError,
    isLoading,
  } = useGraphQLQuery<
    GetWorkspaceRecordingsQuery,
    GetWorkspaceRecordingsQueryVariables
  >(
    gql`
      query GetWorkspaceRecordings($id: ID!, $filter: String) {
        node(id: $id) {
          ... on Workspace {
            id
            recordings(filter: $filter) {
              edges {
                node {
                  buildId
                  comments {
                    id
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
                  uuid
                }
              }
            }
          }
        }
      }
    `,
    { id, filter }
  );

  const recordings = useMemo<WorkspaceRecording[] | undefined>(() => {
    if (isLoading || didError) {
      return [];
    }

    assert(
      data?.node && "recordings" in data?.node && data.node.recordings?.edges,
      `Recordings could not be loaded for id "${id}"`
    );

    return data.node.recordings.edges.map(({ node }) => ({
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
      uuid: node.uuid ?? "",
    }));
  }, [data, didError, id, isLoading]);

  return { didError, isLoading, recordings };
}
