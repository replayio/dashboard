import { AuthContext } from "@/components/AuthContext";
import {
  AddCollaboratorMutation,
  AddCollaboratorMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useAddRecordingCollaborator(onCompleted: () => void) {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const [addNewCollaboratorMutation, { loading, error }] = useMutation<
    AddCollaboratorMutation,
    AddCollaboratorMutationVariables
  >(
    gql`
      mutation AddCollaborator($email: String!, $recordingId: ID!) {
        addRecordingCollaborator(
          input: { email: $email, recordingId: $recordingId }
        ) {
          success
        }
      }
    `,
    {
      client,
      refetchQueries: ["GetOwnerAndCollaborators"],
      onCompleted,
    }
  );

  if (error) {
    console.error("Apollo error while adding a collaborator", error);
  }

  const addCollaborator = (recordingId: string, email: string) =>
    addNewCollaboratorMutation({ variables: { email, recordingId } });

  return { addCollaborator, error, loading };
}
