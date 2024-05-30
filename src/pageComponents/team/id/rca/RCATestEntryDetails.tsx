import { useMemo } from "react";
import classnames from "classnames";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";

import { Icon } from "@/components/Icon";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";

import {
  FormattedFrame,
  RCATestEntry,
  useWorkspaceRootCauseTestEntryDetails,
} from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { User, Workspace, WorkspaceRecording } from "@/graphql/types";
import { formatDuration, formatRelativeTime } from "@/utils/number";
import { RecordingThumbnail } from "@/pageComponents/team/id/recordings/RecordingThumbnail";
import { getURL } from "@/utils/recording";
import { RCAJSFunctionDiscrepancy } from "./RCAJSFunctionDiscrepancy";

function FramesForURL({
  url,
  frames,
  workspaceId,
  analysisTestEntry,
}: {
  url: string;
  frames: FormattedFrame[];
  workspaceId: string;
  analysisTestEntry: RCATestEntry;
}) {
  const sortedFrames = useMemo(() => {
    return sortBy(frames, f => f.line);
  }, [frames]);

  const renderedJSDiscrepancies = sortedFrames.map(f => {
    const key = `${f.sourceId}:${f.key}:${f.functionName}`;
    return (
      <div key={key} className="m-1">
        <RCAJSFunctionDiscrepancy
          analysisTestEntry={analysisTestEntry}
          formattedFrame={f}
          workspaceId={workspaceId}
        />
      </div>
    );
  });

  return (
    <ExpandableSection label={<h4 className="text-md">{url}</h4>}>
      {renderedJSDiscrepancies}
    </ExpandableSection>
  );
}

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

  console.log("Selected analysis entry: ", analysisTestEntry);

  const { discrepancies, resultMetadata } = analysisTestEntry;
  const { failingFrames } = resultMetadata;

  // TODO Sort this by URL once that's available
  const framesByUrl = groupBy(failingFrames, f => f.url || "Unknown");

  const sortedGroups = sortBy(Object.entries(framesByUrl), ([url, frames]) => url);

  const renderedJSDiscrepancies = sortedGroups.map(([url, frames]) => {
    return (
      <FramesForURL
        key={url}
        url={url}
        frames={frames}
        workspaceId={workspaceId}
        analysisTestEntry={analysisTestEntry}
      />
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
      <h4 className="text-md font-bold">JS Discrepancies</h4>
      <div className="flex flex-col grow overflow-y-auto w-full">{renderedJSDiscrepancies}</div>
    </div>
  );
}
