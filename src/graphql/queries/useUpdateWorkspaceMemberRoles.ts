import {
  UpdateWorkspaceMemberRolesMutation,
  UpdateWorkspaceMemberRolesMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

export function useUpdateWorkspaceMemberRoles(onCompleted?: (success: boolean) => void) {
  const {
    error,
    isLoading,
    mutate: UpdateWorkspaceMemberRolesMutation,
  } = useGraphQLMutation<
    UpdateWorkspaceMemberRolesMutation,
    UpdateWorkspaceMemberRolesMutationVariables
  >(
    gql`
      mutation UpdateWorkspaceMemberRoles($id: ID!, $roles: [String!]!) {
        updateWorkspaceMemberRole(input: { id: $id, roles: $roles }) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetWorkspaceMembers"],
      onCompleted: data => {
        onCompleted?.(data.updateWorkspaceMemberRole.success == true);
      },
    }
  );

  if (error) {
    console.error("Apollo error while deleting a collaborator", error);
  }

  const updateWorkspaceMemberRoles = useCallback(
    (id: string, roles: string[]) => {
      UpdateWorkspaceMemberRolesMutation({
        variables: { id, roles },
      });
    },
    [UpdateWorkspaceMemberRolesMutation]
  );

  return { error, isLoading, updateWorkspaceMemberRoles };
}
