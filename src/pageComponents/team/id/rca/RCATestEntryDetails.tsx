import classnames from "classnames";
import { Icon } from "@/components/Icon";
import {
  RCATestEntry,
  useWorkspaceRootCauseTestEntryDetails,
} from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { User, Workspace, WorkspaceRecording } from "@/graphql/types";
import { formatDuration, formatRelativeTime } from "@/utils/number";
import { RecordingThumbnail } from "@/pageComponents/team/id/recordings/RecordingThumbnail";
import { getURL } from "@/utils/recording";

export function RCATestEntryDetails({
  user,
  workspaceId,
  runId,
  testEntryId,
}: {
  workspaceId: string;
  runId: string;
  testEntryId: string;
  user: User;
}) {
  const { analysisTestEntry, isLoading } = useWorkspaceRootCauseTestEntryDetails(
    workspaceId,
    runId,
    testEntryId
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!analysisTestEntry) {
    return <div>Failed to load test entry details</div>;
  }

  const { discrepancies, resultMetadata } = analysisTestEntry;

  const renderedDiscrepances = discrepancies.map(d => {
    return (
      <div key={d.id} className="flex flex-col m-1">
        <div>Kind: {d.kind}</div>
        <div>Event Kind: {d.eventKind}</div>
        <div>Key: {d.key}</div>
      </div>
    );
  });

  const { recordingId } = resultMetadata.failedRun.id;
  // TODO Fake build ID! We don't have the real recording data atm. Just assume it's Chromium
  const buildId = "chromium";

  const recordingHref = getURL(recordingId, buildId);

  return (
    <div
      className={classnames(
        "flex flex-col items-center gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white max-h-[90svh]"
      )}
      data-test-name="RCATestEntryDetails"
    >
      <h4 className="text-md font-bold">Test Name</h4>
      <div> {resultMetadata.title}</div>
      <h4 className="text-md font-bold">Recording</h4>
      <div className="w-16 h-9 bg-slate-900 rounded-sm shrink-0">
        <a href={recordingHref}>
          <RecordingThumbnail buildId={buildId} recordingId={recordingId} />
        </a>
      </div>
      <h4 className="text-md font-bold">Discrepancies</h4>
      <div className="flex flex-col grow overflow-y-auto ">{renderedDiscrepances}</div>
    </div>
  );
}
