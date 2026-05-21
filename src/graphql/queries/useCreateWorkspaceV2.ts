import { SessionContext } from "@/components/SessionContext";
import { QUERY as WORKSPACES_QUERY } from "@/graphql/queries/useWorkspaces";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

// v2 pricing: creates an org + primary workspace WITHOUT assigning a plan.
// The caller is expected to send the user to /team/[id]/plans next to pick
// Free / Growth / Enterprise.

type CreateWorkspaceV2Mutation = {
  createWorkspaceV2: {
    success?: boolean;
    workspace: {
      id: string;
      invitationCode?: string;
      domain?: string;
      isDomainLimitedCode?: boolean;
    };
  };
};

type CreateWorkspaceV2Variables = {
  name: string;
};

export function useCreateWorkspaceV2() {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const {
    error,
    isLoading,
    mutate,
  } = useGraphQLMutation<CreateWorkspaceV2Mutation, CreateWorkspaceV2Variables>(
    gql`
      mutation CreateWorkspaceV2($name: String!) {
        createWorkspaceV2(input: { name: $name }) {
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
      refetchQueries: [{ query: WORKSPACES_QUERY, variables: {} }],
      awaitRefetchQueries: true,
    }
  );

  if (error) {
    console.error("Apollo error while creating a v2 workspace", error);
  }

  const createWorkspaceV2 = async (name: string) => {
    const result = await mutate({ variables: { name } });
    return result.data?.createWorkspaceV2.workspace.id;
  };

  return { createWorkspaceV2, error, isLoading };
}
