import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";

type UpdateRecordingPrivacyMutation = {
  updateRecordingPrivacy: {
    success: boolean | null;
  };
};

type UpdateRecordingPrivacyMutationVariables = {
  recordingId: string;
  isPrivate: boolean;
};

export function useUpdateRecordingPrivacy(onCompleted?: () => void) {
  const { error, isLoading, mutate } = useGraphQLMutation<
    UpdateRecordingPrivacyMutation,
    UpdateRecordingPrivacyMutationVariables
  >(
    gql`
      mutation UpdateRecordingPrivacy($recordingId: ID!, $isPrivate: Boolean!) {
        updateRecordingPrivacy(input: { id: $recordingId, private: $isPrivate }) {
          success
        }
      }
    `,
    {
      onCompleted,
      refetchQueries: ["GetPersonalRecordings", "GetWorkspaceRecordings"],
    }
  );

  const updatePrivacy = (recordingId: string, isPrivate: boolean) =>
    mutate({ variables: { recordingId, isPrivate } });

  return { updatePrivacy, error, isLoading };
}
