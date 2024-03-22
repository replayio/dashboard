import { ApiKeyRow } from "@/app/ApiKeysPanel/ApiKeyRow";
import { CreateNewKey } from "@/app/ApiKeysPanel/CreateNewKey";
import { ApiKey, ApiKeyScope } from "@/graphql/types";
import { useState } from "react";

export function ApiKeys({
  apiKeys,
  createKey,
  deleteKey,
  scopes,
}: {
  apiKeys: ApiKey[] | undefined;
  createKey: (label: string, scopes: ApiKeyScope[]) => Promise<string>;
  deleteKey: (id: string) => void;
  scopes: ApiKeyScope[];
}) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <div className="flex flex-col gap-4 h-full overflow-auto">
      <div className="shrink-0">
        API Keys allow you to upload recordings programmatically.
      </div>
      <div className="shrink-0">
        <CreateNewKey createKey={createKey} scopes={scopes} />
      </div>
      <div className="flex flex-col gap-1 overflow-auto shrink">
        {apiKeys && apiKeys.length > 0 && (
          <div className="flex flex-col gap-2">
            {apiKeys?.map((apiKey) => (
              <ApiKeyRow
                deleteKey={deleteKey}
                key={apiKey.id}
                apiKey={apiKey}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
