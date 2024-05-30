import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";

import { RCACategory, RootCauseDiscrepancyTriplet } from "./useWorkspaceRootCauseCategories";
import { decodeEncodedId } from "./useRootCauseCategoryMutations";

interface RCACategoryDiscrepancy extends RootCauseDiscrepancyTriplet {
  id: string;
  createdAt: string;
}

interface CreateRootCauseCategoryDiscrepanciesMutation {
  createRootCauseCategoryDiscrepancies: {
    discrepancies: RCACategoryDiscrepancy[];
  };
}

interface CreateRootCauseCategoryDiscrepanciesMutationVariables {
  workspaceId: string;
  categoryId: string;
  discrepancies: RootCauseDiscrepancyTriplet[];
}

interface DeleteRootCauseCategoryDiscrepancyMutationVariables {
  workspaceId: string;
  categoryId: string;
  discrepancyId: string;
}

export function useCreateRootCauseCategoryDiscrepancy() {
  const {
    error,
    isLoading,
    mutate: createRootCauseCategoryDiscrepancyMutation,
  } = useGraphQLMutation<
    CreateRootCauseCategoryDiscrepanciesMutation,
    CreateRootCauseCategoryDiscrepanciesMutationVariables
  >(
    gql`
      mutation CreateRootCauseCategoryDiscrepancies(
        $workspaceId: String!
        $categoryId: String!
        $discrepancies: [RootCauseAnalysisDiscrepancyInput!]!
      ) {
        createRootCauseCategoryDiscrepancies(
          input: {
            workspaceId: $workspaceId
            categoryId: $categoryId
            discrepancies: $discrepancies
          }
        ) {
          discrepancies {
            id
            kind
            eventKind
            key
          }
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceRootCauseCategories", "GetWorkspaceRootCauseTestEntryDetails"],
    }
  );

  const createRootCauseCategoryDiscrepancies = (
    workspaceId: string,
    categoryId: string,
    discrepancies: RootCauseDiscrepancyTriplet[]
  ) => {
    const decodedWorkspaceId = decodeEncodedId(workspaceId);
    // const decodedCategoryId = decodeEncodedId(categoryId);

    return createRootCauseCategoryDiscrepancyMutation({
      variables: { workspaceId: decodedWorkspaceId, categoryId, discrepancies },
    });
  };

  return { createRootCauseCategoryDiscrepancies, error, isLoading };
}

export function useDeleteRootCauseCategoryDiscrepancy() {
  const {
    error,
    isLoading,
    mutate: deleteRootCauseCategoryDiscrepancyMutation,
  } = useGraphQLMutation<
    Record<string, unknown>,
    DeleteRootCauseCategoryDiscrepancyMutationVariables
  >(
    gql`
      mutation DeleteRootCauseCategoryDiscrepancy($workspaceId: String!, $discrepancyId: String!) {
        deleteRootCauseCategoryDiscrepancy(
          input: { workspaceId: $workspaceId, discrepancyId: $discrepancyId }
        ) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceRootCauseCategories", "GetWorkspaceRootCauseTestEntryDetails"],
    }
  );

  const deleteRootCauseCategoryDiscrepancy = (
    workspaceId: string,
    categoryId: string,
    discrepancyId: string
  ) => {
    const decodedWorkspaceId = decodeEncodedId(workspaceId);

    return deleteRootCauseCategoryDiscrepancyMutation({
      variables: { workspaceId: decodedWorkspaceId, categoryId, discrepancyId },
    });
  };

  return { deleteRootCauseCategoryDiscrepancy, error, isLoading };
}
