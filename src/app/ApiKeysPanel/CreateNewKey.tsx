import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { ClickToCopyString } from "@/components/ClickToCopyString";
import { Input } from "@/components/Input";
import { ApiKeyScope } from "@/graphql/types";
import { ApolloError } from "@apollo/client";
import { useState } from "react";

export function CreateNewKey({
  createKey,
  createKeyError,
  scopes,
}: {
  createKey: (label: string, scopes: ApiKeyScope[]) => Promise<string | undefined>;
  createKeyError: ApolloError | undefined;
  scopes?: ApiKeyScope[];
}) {
  const [label, setLabel] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [keyValue, setKeyValue] = useState("");

  const [admin, setAdmin] = useState(true);
  const [writeSourcemaps, setWriteSourcemaps] = useState(true);

  if (keyValue) {
    return (
      <>
        <div className="text-yellow-300 font-bold">Copy your API key now.</div>
        <div className="text-yellow-300">This is the only time it will be shown.</div>
        <ClickToCopyString value={keyValue} />
      </>
    );
  } else {
    const onConfirm = async () => {
      if (label) {
        setIsPending(true);

        const selectedScopes: Set<ApiKeyScope> = new Set(scopes);
        if (!scopes) {
          if (admin) {
            selectedScopes.add("admin:all");
          }
          if (writeSourcemaps) {
            selectedScopes.add("write:sourcemap");
          }
        }

        const keyValue = await createKey(label, Array.from(selectedScopes));
        if (keyValue) {
          setKeyValue(keyValue);
          setLabel("");
        }

        setIsPending(false);
      }
    };

    return (
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <Input
            autoFocus
            disabled={isPending}
            onChange={label => setLabel(label)}
            onConfirm={onConfirm}
            name="apiKeyLabel"
            placeholder="API key label"
            value={label}
          />
          <Button disabled={!label || isPending} onClick={onConfirm}>
            Add
          </Button>
        </div>
        {!scopes && (
          <div className="flex flex-row items-center gap-4">
            <Checkbox
              checked={admin}
              label="Create recordings"
              onChange={newChecked => setAdmin(newChecked)}
            />
            <Checkbox
              checked={writeSourcemaps}
              label="Upload source maps"
              onChange={newChecked => setWriteSourcemaps(newChecked)}
            />
          </div>
        )}
        {createKeyError && <div className="text-red-500">{createKeyError.message}</div>}
      </div>
    );
  }
}
