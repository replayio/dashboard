import { ApiKeyRow } from "@/components/ApiKeysPanel/ApiKeyRow";
import { CreateNewKey } from "@/components/ApiKeysPanel/CreateNewKey";
import { ApiKey, ApiKeyScope } from "@/graphql/types";
import type { ApolloError } from "@apollo/client/errors";

export function ApiKeys({
  apiKeys,
  createKey,
  createKeyError,
  deleteKey,
  scopes,
}: {
  apiKeys: ApiKey[] | undefined;
  createKey: (label: string, scopes: ApiKeyScope[]) => Promise<string | undefined>;
  createKeyError: ApolloError | undefined;
  deleteKey: (id: string) => void;
  scopes?: ApiKeyScope[];
}) {
  return (
    <div className="flex flex-col gap-0 h-full overflow-auto">
      <div className="py-4 border-b border-border p-1">
        <div className="text-sm font-medium mb-1">Create API Key</div>
        <div className="text-sm text-muted-foreground mb-3">
          API Keys allow you to upload recordings programmatically.
        </div>
        <CreateNewKey createKey={createKey} createKeyError={createKeyError} scopes={scopes} />
      </div>
      {apiKeys && apiKeys.length > 0 && (
        <div className="py-4">
          <div className="text-sm font-medium mb-3">Your API Keys</div>
          <div className="flex flex-col gap-2">
            {apiKeys.map(apiKey => (
              <ApiKeyRow deleteKey={deleteKey} key={apiKey.id} apiKey={apiKey} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
