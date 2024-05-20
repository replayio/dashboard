import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

// TODO Port types from the backend
interface RCADiscrepancy {
  id: string;
  kind: string;
  eventKind: string;
  key: string;
}

interface RCATestEntry {
  id: string;
  discrepancies: Array<RCADiscrepancy>;
}

interface RCARun {
  id: string;
  metadata: Record<string, unknown>;
  result: string;
  testEntries: Array<RCATestEntry>;
}

// Hand-written for now, since I can't introspect Hasura in Cloud Dev
interface GetWorkspaceRootCauseRunsQuery {
  node: {
    rootCauseAnalysisRuns: {
      edges: Array<{
        node: RCARun;
      }>;
    };
  };
}

interface GetWorkspaceRootCauseRunsQueryVariables {
  workspaceId: string;
}

export function useWorkspaceRootCauseRuns(workspaceId: string) {
  const {
    data,
    error: didError,
    isLoading,
  } = useGraphQLQuery<GetWorkspaceRootCauseRunsQuery, GetWorkspaceRootCauseRunsQueryVariables>(
    gql`
      query GetWorkspaceRootCauseRuns($workspaceId: ID!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            rootCauseAnalysisRuns {
              edges {
                node {
                  id
                  metadata
                  result
                  testEntries {
                    id
                    discrepancies {
                      id
                      kind
                      eventKind
                      key
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    { workspaceId }
  );

  const runs = useMemo<RCARun[]>(() => {
    if (isLoading || didError) {
      return [];
    }

    assert(
      data?.node?.rootCauseAnalysisRuns?.edges,
      `RCA runs could not be loaded for workspace "${workspaceId}"`
    );

    return data.node.rootCauseAnalysisRuns.edges.map(({ node }) => node);
  }, [data, didError, workspaceId, isLoading]);

  return { didError, isLoading, runs };
}
