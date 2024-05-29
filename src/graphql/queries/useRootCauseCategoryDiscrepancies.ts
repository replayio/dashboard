import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";

import { RCACategory, RootCauseDiscrepancyTriplet } from "./useWorkspaceRootCauseCategories";
import { decodeEncodedId } from "./useCreateRootCauseCategory";

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

export function useCreateRootCauseCategoryDiscrepancy() {
  const {
    error,
    isLoading,
    mutate: createRootCauseCategoryMutation,
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

    return createRootCauseCategoryMutation({
      variables: { workspaceId: decodedWorkspaceId, categoryId, discrepancies },
    });
  };

  return { createRootCauseCategoryDiscrepancies, error, isLoading };
}
