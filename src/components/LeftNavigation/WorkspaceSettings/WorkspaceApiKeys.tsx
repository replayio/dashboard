import { ApiKeys } from "@/components/ApiKeysPanel/ApiKeys";
import { useGetWorkspaceApiKeys } from "@/graphql/queries/getWorkspaceApiKeys";
import { useCreateWorkspaceAPIKey } from "@/graphql/queries/createWorkspaceAPIKey";
import { useDeleteWorkspaceAPIKey } from "@/graphql/queries/deleteWorkspaceAPIKey";
import { ApiKeyScope } from "@/graphql/types";

export function WorkspaceApiKeys({ workspaceId }: { workspaceId: string }) {
  const { apiKeys } = useGetWorkspaceApiKeys(workspaceId);
  const { createApiKey } = useCreateWorkspaceAPIKey();
  const { deleteApiKey } = useDeleteWorkspaceAPIKey();

  return (
    <ApiKeys
      apiKeys={apiKeys}
      createKey={(label: string, scopes: ApiKeyScope[]) =>
        createApiKey(workspaceId, label, scopes)
      }
      deleteKey={deleteApiKey}
      scopes={["admin:all", "write:sourcemap"]}
    />
  );
}
