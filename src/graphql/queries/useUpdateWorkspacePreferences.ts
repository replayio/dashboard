import {
  UpdateWorkspacePreferencesMutation,
  UpdateWorkspacePreferencesMutationVariables,
} from "@/graphql/generated/graphql";
import { WorkspaceSettingsFeatures } from "@/graphql/types";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import { useCallback } from "react";

export function useUpdateWorkspacePreferences(onCompleted: (success: boolean) => void) {
  const {
    error,
    isLoading,
    mutate: updateWorkspacePreferencesMutation,
  } = useGraphQLMutation<
    UpdateWorkspacePreferencesMutation,
    UpdateWorkspacePreferencesMutationVariables
  >(
    gql`
      mutation UpdateWorkspacePreferences($workspaceId: ID!, $name: String, $features: JSONObject) {
        updateWorkspaceSettings(
          input: { workspaceId: $workspaceId, name: $name, features: $features }
        ) {
          success
        }
      }
    `,
    {
      refetchQueries: ["GetNonPendingWorkspaces"],
      onCompleted: data => {
        onCompleted(data.updateWorkspaceSettings.success == true);
      },
    }
  );

  if (error) {
    console.error("Apollo error while deleting a collaborator", error);
  }

  const updateWorkspacePreferences = useCallback(
    ({
      features,
      name,
      workspaceId,
    }: {
      features?: WorkspaceSettingsFeatures;
      name?: string;
      workspaceId: string;
    }) => {
      updateWorkspacePreferencesMutation({
        variables: {
          workspaceId,
          features,
          name,
        },
      });
    },
    [updateWorkspacePreferencesMutation]
  );

  return { updateWorkspacePreferences, error, isLoading };
}
