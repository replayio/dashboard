import {
  GetPersonalRecordingsQuery,
  GetPersonalRecordingsQueryVariables,
} from "@/graphql/generated/graphql";
import { WorkspaceRecording } from "@/graphql/types";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import { useMemo } from "react";

export function usePersonalRecordings(filter: string = "") {
  const { data, error, isLoading } = useGraphQLQuery<
    GetPersonalRecordingsQuery,
    GetPersonalRecordingsQueryVariables
  >(
    gql`
      query GetPersonalRecordings($filter: String) {
        viewer {
          recordings(filter: $filter) {
            edges {
              node {
                buildId
                duration
                comments {
                  id
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
                uuid
              }
            }
          }
        }
      }
    `,
    { filter }
  );

  const recordings = useMemo<WorkspaceRecording[] | undefined>(() => {
    return (
      data?.viewer?.recordings.edges.map(({ node }) => ({
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
        uuid: node.uuid || "",
      })) ?? []
    );
  }, [data]);

  return { error, isLoading, recordings };
}
