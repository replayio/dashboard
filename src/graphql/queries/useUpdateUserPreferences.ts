import {
  UpdateUserPreferencesMutation,
  UpdateUserPreferencesMutationVariables,
} from "@/graphql/generated/graphql";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

export function useUpdateUserPreferences(
  onCompleted: (success: boolean) => void
) {
  const {
    error,
    isLoading,
    mutate: updateUserPreferencesMutation,
  } = useGraphQLMutation<
    UpdateUserPreferencesMutation,
    UpdateUserPreferencesMutationVariables
  >(
    gql`
      mutation UpdateUserPreferences($preferences: JSONObject!) {
        updateUserPreferences(input: { preferences: $preferences }) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetOwnerAndCollaborators"],
      onCompleted: (data) => {
        onCompleted(data.updateUserPreferences.success == true);
      },
    }
  );

  if (error) {
    console.error("Apollo error while deleting a collaborator", error);
  }

  const updateUserPreferences = useCallback(
    (role: string) => {
      updateUserPreferencesMutation({ variables: { preferences: { role } } });
    },
    [updateUserPreferencesMutation]
  );

  return { updateUserPreferences, error, isLoading };
}
