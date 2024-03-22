import Checkbox from "@/components/Checkbox";
import { ExternalLink } from "@/components/ExternalLink";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { useNonPendingWorkspaces } from "@/graphql/queries/useNonPendingWorkspaces";
import { useUpdateWorkspacePreferences } from "@/graphql/queries/useUpdateWorkspacePreferences";
import { WorkspaceSettings } from "@/graphql/types";
import useDebouncedState from "@/hooks/useDebouncedState";
import assert from "assert";

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

  const { updateWorkspacePreferences } = useUpdateWorkspacePreferences(
    (success) => {
      // No-op
    }
  );

  const [motd, setMotd] = useDebouncedState<string>(
    settings?.motd?.trim() ?? "",
    (motd) => {
      updateWorkspacePreferences({
        // HACK An empty string update will be ignored; see BAC-4861
        motd: motd.trim() || " ",
        workspaceId,
      });
    }
  );
  const [recordingFeatures, setRecordingFeatures] = useDebouncedState<
    WorkspaceSettings["features"]["recording"]
  >(
    {
      allowList: features?.recording?.allowList ?? [],
      blockList: features?.recording?.blockList ?? [],
      public: features?.recording?.public == true,
    },
    (recordingFeatures) => {
      updateWorkspacePreferences({
        features: {
          recording: recordingFeatures,
        },
        workspaceId,
      });
    }
  );
  const [userFeatures, setUserFeatures] = useDebouncedState<
    WorkspaceSettings["features"]["user"]
  >(
    {
      autoJoin: features?.user?.autoJoin ?? 0,
      library: features?.user?.library == true,
    },
    (userFeatures) => {
      updateWorkspacePreferences({
        features: {
          user: userFeatures,
        },
        workspaceId,
      });
    }
  );

  return (
    <div className="flex flex-col gap-2 px-1 pb-1">
      <Checkbox
        checked={!recordingFeatures.public}
        onChange={(value: boolean) =>
          setRecordingFeatures({
            ...recordingFeatures,
            public: !value,
          })
        }
        label="Disable public recordings"
      />
      <div className="flex flex-row gap-2 items-start">
        <div className="w-60 truncate">Allow from</div>
        <TextArea
          className="h-14"
          defaultValue={recordingFeatures.allowList.join(", ") ?? ""}
          onChange={(value) =>
            setRecordingFeatures({
              ...recordingFeatures,
              allowList: value.split(",").map((value) => value.trim()),
            })
          }
          placeholder="Recorded URLs must match one of these domains (if set)"
        />
      </div>
      <div className="flex flex-row gap-2 items-start">
        <div className="w-60 truncate">Block from</div>
        <TextArea
          className="h-14"
          defaultValue={recordingFeatures.blockList.join(", ") ?? ""}
          onChange={(value) =>
            setRecordingFeatures({
              ...recordingFeatures,
              blockList: value.split(",").map((value) => value.trim()),
            })
          }
          placeholder="Recorded URLs must not match any of these domains (if set)"
        />
      </div>
      <Checkbox
        checked={!userFeatures.library}
        onChange={(value: boolean) =>
          setUserFeatures({
            ...userFeatures,
            library: !value,
          })
        }
        label="Disable my library"
      />
      <div className="flex flex-row gap-2 items-start">
        <div className="w-60 truncate">Automatically add users</div>
        <Select
          className="h-14"
          onChange={(option) =>
            setUserFeatures({
              ...userFeatures,
              autoJoin: (option as Option).value,
            })
          }
          options={OPTIONS}
          placeholder="Recorded URLs must not match any of these domains (if set)"
          value={
            OPTIONS.find((option) => option.value === userFeatures.autoJoin) ??
            DEFAULT_OPTION
          }
        />
      </div>
      <div className="flex flex-row gap-2 items-start">
        <div className="w-60 truncate">Welcome message</div>
        <div className="flex flex-col gap-2 grow">
          <TextArea className="h-14" defaultValue={motd} onChange={setMotd} />
          <ExternalLink href="/browser/new-tab">Preview</ExternalLink>
        </div>
      </div>
    </div>
  );
}
