import {
  UpdateDefaultWorkspaceMutation,
  UpdateDefaultWorkspaceMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";

export async function updateDefaultWorkspace(workspaceId: string) {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<
    UpdateDefaultWorkspaceMutation,
    UpdateDefaultWorkspaceMutationVariables
  >({
    query: gql`
      mutation UpdateDefaultWorkspace($workspaceId: ID) {
        updateUserDefaultWorkspace(input: { workspaceId: $workspaceId }) {
          success
          workspace {
            id
          }
        }
      }
    `,
    variables: { workspaceId },
  });
}
