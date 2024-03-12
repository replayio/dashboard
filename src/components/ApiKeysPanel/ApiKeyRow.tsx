import { Button } from "@/components/Button";
import { ApiKey } from "@/graphql/types";

export function ApiKeyRow({
  apiKey,
  deleteKey,
}: {
  apiKey: ApiKey;
  deleteKey: (id: string) => void;
}) {
  // TODO: Confirm and delete

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="truncate">{apiKey.label}</div>
      <div className="text-slate-500 text-sm grow">
        ({apiKey.recordingCount} / {apiKey.maxRecordings} recordings)
      </div>
      <Button color="secondary" variant="outline">
        Delete
      </Button>
    </div>
  );
}
