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

interface UpdateRootCauseCategoryMutation {
  updateRootCauseCategory: {
    category: RCACategory;
  };
}

interface UpdateRootCauseCategoryMutationVariables {
  workspaceId: string;
  categoryId: string;
  name: string;
}

interface DeleteRootCauseCategoryMutation {
  deleteRootCauseCategory: {
    success: boolean;
  };
}

interface DeleteRootCauseCategoryMutationVariables {
  workspaceId: string;
  categoryId: string;
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

    return createRootCauseCategoryMutation({
      variables: { workspaceId: decodedWorkspaceId, name },
    });
  };

  return { createRootCauseCategory, error, isLoading };
}

export function useUpdateRootCauseCategory() {
  const {
    error,
    isLoading,
    mutate: updateRootCauseCategoryMutation,
  } = useGraphQLMutation<UpdateRootCauseCategoryMutation, UpdateRootCauseCategoryMutationVariables>(
    gql`
      mutation UpdateRootCauseCategory(
        $workspaceId: String!
        $categoryId: String!
        $name: String!
      ) {
        updateRootCauseCategory(
          input: { workspaceId: $workspaceId, categoryId: $categoryId, name: $name }
        ) {
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

  const updateRootCauseCategory = (workspaceId: string, categoryId: string, name: string) => {
    // Our workspaceId is base64 encoded, so we need to decode it before sending it to the backend.
    // This should probably be handled more consistently somehow.
    const decodedWorkspaceId = decodeEncodedId(workspaceId);

    return updateRootCauseCategoryMutation({
      variables: { workspaceId: decodedWorkspaceId, categoryId, name },
    });
  };

  return { updateRootCauseCategory, error, isLoading };
}

export function useDeleteRootCauseCategory() {
  const {
    error,
    isLoading,
    mutate: deleteRootCauseCategoryMutation,
  } = useGraphQLMutation<DeleteRootCauseCategoryMutation, DeleteRootCauseCategoryMutationVariables>(
    gql`
      mutation DeleteRootCauseCategory($workspaceId: String!, $categoryId: String!) {
        deleteRootCauseCategory(input: { workspaceId: $workspaceId, categoryId: $categoryId }) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceRootCauseCategories"],
    }
  );

  const deleteRootCauseCategory = (workspaceId: string, categoryId: string) => {
    // Our workspaceId is base64 encoded, so we need to decode it before sending it to the backend.
    // This should probably be handled more consistently somehow.
    const decodedWorkspaceId = decodeEncodedId(workspaceId);

    return deleteRootCauseCategoryMutation({
      variables: { workspaceId: decodedWorkspaceId, categoryId },
    });
  };

  return { deleteRootCauseCategory, error, isLoading };
}
