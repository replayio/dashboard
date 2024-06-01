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
        "flex flex-row items-center gap-4 px-4 py-2 rounded-md mb-1 cursor-pointer text-white",
        {
          "bg-sky-900 hover:bg-sky-800": selected,
          "bg-slate-800 hover:bg-slate-700": !selected,
        }
      )}
      data-test-name="RCATestEntryRow"
      onClick={onClick}
    >
      <div className="flex flex-row items-center w-full gap-2 truncate">
        <div className="flex flex-col gap-1 truncate grow">
          <div className="truncate">{resultMetadata.title}</div>
          <div className="flex flex-row gap-4 text-sm text-gray-400 whitespace-nowrap">
            <div
              className="flex flex-row items-center w-20 gap-1 shrink-0"
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
