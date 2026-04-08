import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";

type UpdateRecordingWorkspaceMutation = {
  updateRecordingWorkspace: {
    success: boolean | null;
  };
};

type UpdateRecordingWorkspaceMutationVariables = {
  recordingId: string;
  workspaceId: string | null;
};

export function useUpdateRecordingWorkspace(onCompleted?: () => void) {
  const { error, isLoading, mutate } = useGraphQLMutation<
    UpdateRecordingWorkspaceMutation,
    UpdateRecordingWorkspaceMutationVariables
  >(
    gql`
      mutation UpdateRecordingWorkspace($recordingId: ID!, $workspaceId: ID) {
        updateRecordingWorkspace(input: { id: $recordingId, workspaceId: $workspaceId }) {
          success
        }
      }
    `,
    {
      onCompleted,
      refetchQueries: ["GetPersonalRecordings", "GetWorkspaceRecordings"],
    }
  );

  const updateWorkspace = (recordingId: string, workspaceId: string | null) =>
    mutate({ variables: { recordingId, workspaceId } });

  return { updateWorkspace, error, isLoading };
}
