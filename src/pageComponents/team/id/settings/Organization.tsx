import Checkbox from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { useWorkspaces } from "@/graphql/queries/useWorkspaces";
import { useUpdateWorkspacePreferences } from "@/graphql/queries/useUpdateWorkspacePreferences";
import { WorkspaceSettings } from "@/graphql/types";
import useDebouncedState from "@/hooks/useDebouncedState";
import {
  DEFAULT_MEMBER_ROLE_OPTION,
  MEMBER_ROLE_OPTIONS,
  WorkspaceUserRoleType,
} from "@/pageComponents/team/id/settings/constants";
import { getDefaultPermissionBitmask } from "@/utils/user";
import assert from "assert";

export function Organization({ workspaceId }: { workspaceId: string }) {
  const { workspaces } = useWorkspaces();
  const workspace = workspaces?.find(({ id }) => id === workspaceId);
  assert(workspace != null, `Workspace not found "${workspaceId}"`);

  const { settings } = workspace;
  const { features } = settings ?? {};

  const { updateWorkspacePreferences } = useUpdateWorkspacePreferences(() => {});

  const [name, setName] = useDebouncedState<string>(workspace.name, name => {
    updateWorkspacePreferences({
      name,
      workspaceId,
    });
  });

  const [recordingFeatures, setRecordingFeatures] = useDebouncedState<
    WorkspaceSettings["features"]["recording"]
  >(
    {
      allowList: features?.recording?.allowList ?? [],
      blockList: features?.recording?.blockList ?? [],
      public: features?.recording?.public == true,
    },
    recordingFeatures => {
      updateWorkspacePreferences({
        features: {
          recording: recordingFeatures,
        },
        workspaceId,
      });
    }
  );
  const [userFeatures, setUserFeatures] = useDebouncedState<WorkspaceSettings["features"]["user"]>(
    {
      autoJoin: features?.user?.autoJoin ?? 0,
    },
    userFeatures => {
      updateWorkspacePreferences({
        features: {
          user: userFeatures,
        },
        workspaceId,
      });
    }
  );

  const fieldClass = "flex flex-col gap-1.5";
  const labelClass = "text-sm font-medium";

  return (
    <div className="flex flex-col gap-6 py-4">
      <div className={fieldClass}>
        <label className={labelClass}>Name</label>
        <Input defaultValue={name} onChange={setName} placeholder="Your company name" />
      </div>

      <div className="py-4 border-t border-border">
        <div className="text-sm font-medium mb-3">Recording settings</div>
        <div className="flex flex-col gap-4">
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
          <div className={fieldClass}>
            <label className={labelClass}>Allow from</label>
            <TextArea
              className="min-h-24"
              defaultValue={recordingFeatures.allowList.join(", ") ?? ""}
              onChange={value =>
                setRecordingFeatures({
                  ...recordingFeatures,
                  allowList: value.split(",").map(v => v.trim()),
                })
              }
              placeholder="Recorded URLs must match one of these domains (if set)"
            />
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Block from</label>
            <TextArea
              className="min-h-24"
              defaultValue={recordingFeatures.blockList.join(", ") ?? ""}
              onChange={value =>
                setRecordingFeatures({
                  ...recordingFeatures,
                  blockList: value.split(",").map(v => v.trim()),
                })
              }
              placeholder="Recorded URLs must not match any of these domains (if set)"
            />
          </div>
        </div>
      </div>

      <div className="py-4 border-t border-border">
        <div className="text-sm font-medium mb-3">Default member permission</div>
        <Select
          onChange={option =>
            setUserFeatures({
              ...userFeatures,
              autoJoin: getDefaultPermissionBitmask(option as WorkspaceUserRoleType),
            })
          }
          options={MEMBER_ROLE_OPTIONS}
          value={
            MEMBER_ROLE_OPTIONS.find(option => option.bitmask === userFeatures.autoJoin) ??
            DEFAULT_MEMBER_ROLE_OPTION
          }
        />
      </div>
    </div>
  );
}
