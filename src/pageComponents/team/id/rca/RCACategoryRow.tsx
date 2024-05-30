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
import { RCACategory } from "@/graphql/queries/useWorkspaceRootCauseCategories";

export function RCACategoryRow({
  // user,
  category,
  // onClick,
  // selected,
}: {
  category: RCACategory;
  // user: User;
  // onClick: () => void;
  // selected: boolean;
}) {
  const actualPercentage = (category.matchingFailurePercentage * 100).toFixed(2);

  return (
    <div
      className={classnames(
        "flex flex-row items-center gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white",
        {
          // "border-blue-400 border-2": selected,
        }
      )}
      data-test-name="RCACategoryRow"
      // onClick={onClick}
    >
      <div className="flex flex-row items-center gap-1 w-full truncate">
        <div className="flex flex-col grow truncate">
          <div className="truncate font-bold">{category.name}</div>
          <div>Failure percentage: {actualPercentage}%</div>
          <div>Discrepancies: {category.discrepancies.length}</div>
        </div>
      </div>
    </div>
  );
}
