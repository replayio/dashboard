import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { ClickToCopyString } from "@/components/ClickToCopyString";
import { Input } from "@/components/Input";
import { ApiKeyScope } from "@/graphql/types";
import { useState } from "react";

export function CreateNewKey({
  createKey,
  scopes,
}: {
  createKey: (label: string, scopes: ApiKeyScope[]) => Promise<string>;
  scopes: ApiKeyScope[];
}) {
  const [label, setLabel] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [keyValue, setKeyValue] = useState("");

  const [admin, setAdmin] = useState(false);
  const [writeSourcemaps, setWriteSourcemaps] = useState(false);

  if (keyValue) {
    return (
      <>
        <div className="text-yellow-300 font-bold">Copy your API key now.</div>
        <div className="text-yellow-300">
          This is the only time it will be shown.
        </div>
        <ClickToCopyString value={keyValue} />
      </>
    );
  } else {
    const onConfirm = async () => {
      if (label) {
        setIsPending(true);

        const selectedScopes: ApiKeyScope[] = [];
        if (admin) {
          selectedScopes.push("admin:all");
        }
        if (writeSourcemaps) {
          selectedScopes.push("write:sourcemap");
        }

        const keyValue = await createKey(label, selectedScopes);

        setKeyValue(keyValue);

        setIsPending(false);
        setLabel("");
      }
    };

    return (
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <Input
            autoFocus
            disabled={isPending}
            onChange={(label) => setLabel(label)}
            onConfirm={onConfirm}
            name="apiKeyLabel"
            placeholder="API key label"
            value={label}
          />
          <Button disabled={!label || isPending} onClick={onConfirm}>
            Add
          </Button>
        </div>
        {!keyValue && scopes.length > 1 && (
          <div className="flex flex-row items-center gap-4">
            {scopes.includes("admin:all") && (
              <Checkbox
                checked={admin}
                label="Create recordings"
                onChange={(newChecked) => setAdmin(newChecked)}
              />
            )}

            {scopes.includes("write:sourcemap") && (
              <Checkbox
                checked={writeSourcemaps}
                label="Upload source maps"
                onChange={(newChecked) => setWriteSourcemaps(newChecked)}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
