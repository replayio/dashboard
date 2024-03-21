import Checkbox from "@/components/Checkbox";
import { ExternalLink } from "@/components/ExternalLink";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import assert from "assert";

const OPTIONS = [
  { label: "None" },
  { label: "Viewer" },
  { label: "Developer" },
  { label: "Admin" },
];
const DEFAULT_OPTION = OPTIONS[0]!;

export function Organization({ id: workspaceId }: { id: string }) {
  const { workspaces } = useNonPendingWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);
  assert(workspace != null, `Workspace not found "${workspaceId}"`);

  // TODO Load and save settings

  return (
    <div className="flex flex-col gap-2 px-1 pb-1">
      <Checkbox
        checked={true}
        onChange={() => {}}
        label="Disable public recordings"
      />
      <div className="flex flex-row gap-2 items-start">
        <div className="grow">Allow from</div>
        <TextArea
          className="h-14 w-64 shrink-0 grow-0 text-sm"
          defaultValue=""
          placeholder="Recorded URLs must match one of these domains (if set)"
        />
      </div>
      <div className="flex flex-row gap-2 items-start">
        <div className="grow">Block from</div>
        <TextArea
          className="h-14 w-64 shrink-0 grow-0 text-sm"
          defaultValue=""
          placeholder="Recorded URLs must not match any of these domains (if set)"
        />
      </div>
      <Checkbox checked={true} onChange={() => {}} label="Disable my library" />
      <div className="flex flex-row gap-2 items-start">
        <div className="grow">Automatically add users</div>
        <Select
          className="h-14 w-64 shrink-0 grow-0 text-sm"
          onChange={(option) => {
            console.log("selected", option);
          }}
          options={OPTIONS}
          placeholder="Recorded URLs must not match any of these domains (if set)"
          value={DEFAULT_OPTION}
        />
      </div>
      <div className="flex flex-row gap-2 items-start">
        <div className="grow">Welcome message</div>
        <div className="flex flex-col gap-2">
          <TextArea
            className="h-14 w-64 shrink-0 grow-0 text-sm"
            defaultValue=""
          />
          <ExternalLink href="/browser/new-tab">Preview</ExternalLink>
        </div>
      </div>
    </div>
  );
}
