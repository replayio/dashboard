import Checkbox from "@/components/Checkbox";
import { ExternalLink } from "@/components/ExternalLink";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { WorkspacesFeaturesArgs } from "@/graphql/generated/graphql";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { useUpdateWorkspacePreferences } from "@/graphql/queries/useUpdateWorkspacePreferences";
import { WorkspaceSettings, WorkspaceSettingsFeatures } from "@/graphql/types";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import assert from "assert";
import { useState } from "react";

const OPTIONS = [
  { label: "None", value: 0 },
  { label: "Viewer", value: 1 },
  { label: "Developer", value: 3 },
  { label: "Admin", value: 131 },
];
const DEFAULT_OPTION = OPTIONS[0]!;
type Option = typeof DEFAULT_OPTION;

export function Organization({ id: workspaceId }: { id: string }) {
  const { workspaces } = useNonPendingWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);
  assert(workspace != null, `Workspace not found "${workspaceId}"`);

  const { settings } = workspace;
  const { features } = settings ?? {};

  const [motd, setMotd] = useState<string>(settings?.motd ?? "");

  const [state, setState] = useState<WorkspaceSettings>({
    features: {
      recording: {
        allowList: features?.recording?.allowList ?? [],
        blockList: features?.recording?.blockList ?? [],
        public: features?.recording?.public == true,
      },
      user: {
        autoJoin: features?.user?.autoJoin ?? 0,
        library: features?.user?.library == true,
      },
    },
    motd: settings?.motd ?? "",
  });

  const { updateWorkspacePreferences } = useUpdateWorkspacePreferences(
    (success) => {
      // No-op
    }
  );

  const debouncedUpdate = useDebouncedCallback(
    ({
      features,
      motd,
      name,
    }: {
      features?: WorkspaceSettingsFeatures;
      motd?: string;
      name?: string;
    }) => {
      updateWorkspacePreferences({
        features,
        motd,
        name,
        workspaceId,
      });
    },
    1_000
  );

  return (
    <div className="flex flex-col gap-2 px-1 pb-1">
      <Checkbox
        checked={!features?.recording?.public}
        onChange={(value: boolean) =>
          setState((prevState) => ({
            ...prevState,
            features: {
              ...prevState.features,
              recording: {
                ...prevState.features.recording,
                public: !value,
              },
            },
          }))
        }
        label="Disable public recordings"
      />
      <div className="flex flex-row gap-2 items-start">
        <div className="grow">Allow from</div>
        <TextArea
          className="h-14 w-64 shrink-0 grow-0 text-sm"
          defaultValue={features?.recording?.allowList.join(", ") ?? ""}
          onChange={(value) => {
            debouncedUpdate({
              features: {
                recording: {
                  allowList: value.split(",").map((value) => value.trim()),
                },
              },
            });
          }}
          placeholder="Recorded URLs must match one of these domains (if set)"
        />
      </div>
      <div className="flex flex-row gap-2 items-start">
        <div className="grow">Block from</div>
        <TextArea
          className="h-14 w-64 shrink-0 grow-0 text-sm"
          defaultValue={features?.recording?.blockList.join("\n") ?? ""}
          onChange={(value) => {
            debouncedUpdate({
              features: {
                recording: {
                  blockList: value.split(",").map((value) => value.trim()),
                },
              },
            });
          }}
          placeholder="Recorded URLs must not match any of these domains (if set)"
        />
      </div>
      <Checkbox
        checked={!features?.user?.library}
        onChange={(value: boolean) =>
          updateWorkspacePreferences({
            features: {
              user: {
                library: !value,
              },
            },
            workspaceId,
          })
        }
        label="Disable my library"
      />
      <div className="flex flex-row gap-2 items-start">
        <div className="grow">Automatically add users</div>
        <Select
          className="h-14 w-64 shrink-0 grow-0 text-sm"
          onChange={(option) =>
            updateWorkspacePreferences({
              features: {
                user: {
                  autoJoin: (option as Option).value,
                },
              },
              workspaceId,
            })
          }
          options={OPTIONS}
          placeholder="Recorded URLs must not match any of these domains (if set)"
          value={
            OPTIONS.find(
              (option) => option.value === features?.user?.autoJoin
            ) ?? DEFAULT_OPTION
          }
        />
      </div>
      <div className="flex flex-row gap-2 items-start">
        <div className="grow">Welcome message</div>
        <div className="flex flex-col gap-2">
          <TextArea
            className="h-14 w-64 shrink-0 grow-0 text-sm"
            defaultValue={motd}
            onChange={setMotd}
          />
          <ExternalLink href="/browser/new-tab">Preview</ExternalLink>
        </div>
      </div>
    </div>
  );
}
