import { GetDefaultWorkspaceQuery } from "@/graphql/generated/graphql";
import { getGraphQLClientServer } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";

export async function getDefaultWorkspace() {
  const graphQLClient = await getGraphQLClientServer();
  const response = await graphQLClient.query<GetDefaultWorkspaceQuery>({
    query: gql`
      query GetDefaultWorkspace {
        viewer {
          defaultWorkspace {
            id
          }
        }
      }
    `,
  });

  return response.data?.viewer?.defaultWorkspace?.id;
}
