import classnames from "classnames";
import { Icon } from "@/components/Icon";
import {
  RCATestEntry,
  RCATestEntryWithoutDiscrepancies,
} from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { User, Workspace, WorkspaceRecording } from "@/graphql/types";
import { formatDuration, formatRelativeTime } from "@/utils/number";
import { getURL } from "@/utils/recording";
import Link from "next/link";

export function RCATestEntryRow({
  user,
  analysisTestEntry,
  onClick,
  selected,
}: {
  analysisTestEntry: RCATestEntryWithoutDiscrepancies;
  user: User;
  onClick: () => void;
  selected: boolean;
}) {
  const { resultMetadata } = analysisTestEntry;

  return (
    <div
      className={classnames(
        "flex flex-row items-center gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white",
        {
          "border-blue-400 border-2": selected,
        }
      )}
      data-test-name="RCATestEntryRow"
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-2 w-full truncate">
        <div className="flex flex-col grow gap-1 truncate">
          <div className="truncate">{resultMetadata.title}</div>
          <div className="flex flex-row gap-4 text-sm text-gray-500 whitespace-nowrap">
            <div
              className="w-20 flex flex-row gap-1 items-center shrink-0"
              suppressHydrationWarning
            >
              <Icon className="w-3 h-3" type="calendar" />
              {formatRelativeTime(new Date(analysisTestEntry.createdAt))} ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
