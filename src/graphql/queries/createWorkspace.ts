import { SessionContext } from "@/components/SessionContext";
import {
  CreateNewWorkspaceMutation,
  CreateNewWorkspaceMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useCreateWorkspace(onCompleted: (id: string) => void, onFailed: () => void) {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClient(accessToken);

  const [createWorkspaceMutation, { loading, error }] = useMutation<
    CreateNewWorkspaceMutation,
    CreateNewWorkspaceMutationVariables
  >(
    gql`
      mutation CreateNewWorkspace($name: String!, $planKey: String!) {
        createWorkspace(input: { name: $name, planKey: $planKey }) {
          success
          workspace {
            id
            invitationCode
            domain
            isDomainLimitedCode
          }
        }
      }
    `,
    {
      client,
      refetchQueries: ["GetWorkspaces"],
    }
  );

  if (error) {
    console.error("Apollo error while creating a workspace", error);
  }

  const createWorkspace = async (name: string, planKey: string) => {
    const result = await createWorkspaceMutation({
      variables: { name, planKey },
    });

    if (result.data?.createWorkspace?.workspace?.id) {
      onCompleted(result.data?.createWorkspace?.workspace?.id);
    } else {
      onFailed();
    }
  };

  return { createWorkspace, error, loading };
}
