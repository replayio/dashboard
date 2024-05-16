import { SessionContext } from "@/components/SessionContext";
import {
  CreateNewWorkspaceMutation,
  CreateNewWorkspaceMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { QUERY } from "@/graphql/queries/useWorkspaces";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useCreateWorkspace() {
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
      // This syntax is required to ensure Apollo refetches Workspaces after creation
      // See github.com/apollographql/apollo-client/issues/5419#issuecomment-598065442
      refetchQueries: [{ query: QUERY, variables: {} }],
      awaitRefetchQueries: true,
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
      return result.data?.createWorkspace?.workspace?.id;
    }
  };

  return { createWorkspace, error, loading };
}
