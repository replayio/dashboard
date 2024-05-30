import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";
import { decodeEncodedId } from "./useRootCauseCategoryMutations";

export interface RootCauseDiscrepancyTriplet {
  kind: string;
  eventKind: string;
  key: string;
}

export interface RCACategoryDiscrepancy extends RootCauseDiscrepancyTriplet {
  id: string;
  createdAt: string;
}

export interface RCACategory {
  id: string;
  createdAt: string;
  name: string;
  matchingFailurePercentage: number;
  discrepancies: RCACategoryDiscrepancy[];
}

// Hand-written for now, since I can't introspect Hasura in Cloud Dev
interface GetWorkspaceRootCauseCategoriesQuery {
  workspace: {
    rootCauseAnalysisCategories: Array<RCACategory>;
  };
}

interface GetWorkspaceRootCauseCategoriesQueryVariables {
  workspaceId: string;
}

// TODO Update backend to allow filtering on status / creation date, and do ordering
// TOOD Update backend to allow fetching an individual test entry by ID
// TODO stop fetching all discrepancies up front, and only fetch when an entry is selected

export function useWorkspaceRootCauseCategories(workspaceId: string) {
  const decodedWorkspaceId = decodeEncodedId(workspaceId);
  const {
    data,
    error: didError,
    isLoading,
  } = useGraphQLQuery<
    GetWorkspaceRootCauseCategoriesQuery,
    GetWorkspaceRootCauseCategoriesQueryVariables
  >(
    gql`
      query GetWorkspaceRootCauseCategories($workspaceId: UUID!) {
        workspace(uuid: $workspaceId) {
          rootCauseAnalysisCategories {
            id
            name
            matchingFailurePercentage
            discrepancies {
              id
              createdAt
              kind
              eventKind
              key
            }
          }
        }
      }
    `,
    { workspaceId: decodedWorkspaceId }
  );

  const categories = useMemo<RCACategory[]>(() => {
    if (isLoading || didError) {
      return [];
    }

    assert(
      data?.workspace?.rootCauseAnalysisCategories,
      `RCA categories could not be loaded for workspace "${workspaceId}"`
    );

    const { rootCauseAnalysisCategories: categories } = data.workspace;

    return categories;
  }, [data, didError, workspaceId, isLoading]);

  return { didError, isLoading, categories };
}
