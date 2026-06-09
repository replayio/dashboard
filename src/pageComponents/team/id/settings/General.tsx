import { Input } from "@/components/Input";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { useUpdateWorkspacePreferences } from "@/graphql/queries/useUpdateWorkspacePreferences";
import useDebouncedState from "@/hooks/useDebouncedState";
import assert from "assert";

export function General({ workspaceId }: { workspaceId: string }) {
  const { workspaces } = useWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);
  assert(workspace != null, `Workspace not found "${workspaceId}"`);

  const { updateWorkspacePreferences } = useUpdateWorkspacePreferences(() => {});

  const [name, setName] = useDebouncedState<string>(workspace.name, name => {
    updateWorkspacePreferences({
      name,
      workspaceId,
    });
  });

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Name</label>
        <Input defaultValue={name} onChange={setName} placeholder="Your team name" />
        <p className="text-xs text-muted-foreground">
          This is how your workspace appears throughout Replay.
        </p>
      </div>
    </div>
  );
}
