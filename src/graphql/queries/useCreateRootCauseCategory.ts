import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";

import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";

import { RCACategory } from "./useWorkspaceRootCauseCategories";

interface CreateRootCauseCategoryMutation {
  createRootCauseCategory: {
    category: RCACategory;
  };
}

interface CreateRootCauseCategoryMutationVariables {
  workspaceId: string;
  name: string;
}

export function decodeEncodedId(encodedId: string) {
  return atob(encodedId).split(":")[1]!;
}

export function useCreateRootCauseCategory() {
  const {
    error,
    isLoading,
    mutate: createRootCauseCategoryMutation,
  } = useGraphQLMutation<CreateRootCauseCategoryMutation, CreateRootCauseCategoryMutationVariables>(
    gql`
      mutation CreateRootCauseCategory($workspaceId: String!, $name: String!) {
        createRootCauseCategory(input: { workspaceId: $workspaceId, name: $name }) {
          category {
            id
            name
          }
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceRootCauseCategories"],
    }
  );

  const createRootCauseCategory = (workspaceId: string, name: string) => {
    // Our workspaceId is base64 encoded, so we need to decode it before sending it to the backend.
    // This should probably be handled more consistently somehow.
    const decodedWorkspaceId = decodeEncodedId(workspaceId);
    console.log({ workspaceId, decodedWorkspaceId });
    return createRootCauseCategoryMutation({
      variables: { workspaceId: decodedWorkspaceId, name },
    });
  };

  return { createRootCauseCategory, error, isLoading };
}
