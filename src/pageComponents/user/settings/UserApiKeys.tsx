import { ApiKeys } from "@/app/ApiKeysPanel/ApiKeys";

import { useCreateUserAPIKey } from "@/graphql/queries/createUserApiKey";
import { useDeleteUserAPIKey } from "@/graphql/queries/deleteUserApiKey";
import { useGetUserSettings } from "@/graphql/queries/useGetUserSettings";

export function UserApiKeys() {
  const {
    settings: { apiKeys },
  } = useGetUserSettings();
  const { createApiKey, error } = useCreateUserAPIKey();
  const { deleteApiKey } = useDeleteUserAPIKey();

  return (
    <ApiKeys
      apiKeys={apiKeys}
      createKey={createApiKey}
      createKeyError={error}
      deleteKey={deleteApiKey}
      scopes={["admin:all"]}
    />
  );
}
