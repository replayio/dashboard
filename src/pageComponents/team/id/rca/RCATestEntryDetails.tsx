import classnames from "classnames";
import { Icon } from "@/components/Icon";
import { RCATestEntry } from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { User, Workspace, WorkspaceRecording } from "@/graphql/types";
import { formatDuration, formatRelativeTime } from "@/utils/number";

export function RCATestEntryDetails({
  user,
  analysisTestEntry,
}: {
  analysisTestEntry: RCATestEntry;
  user: User;
}) {
  const { resultMetadata, discrepancies } = analysisTestEntry;

  const renderedDiscrepances = discrepancies.map(d => {
    return (
      <div key={d.id} className="flex flex-col m-1">
        <div>Kind: {d.kind}</div>
        <div>Event Kind: {d.eventKind}</div>
        <div>Key: {d.key}</div>
      </div>
    );
  });

  return (
    <div
      className={classnames(
        "flex flex-col items-center gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white"
      )}
      data-test-name="RCATestEntryDetails"
    >
      <h4 className="text-md font-bold">Test Name</h4>
      <div> {resultMetadata.title}</div>
      <h4 className="text-md font-bold">Discrepancies</h4>
      <div className="flex flex-col overflow-y-auto">{renderedDiscrepances}</div>
    </div>
  );
}
