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

  const { recordingId: failedRecordingId } = resultMetadata.failedRun.id;
  const { recordingId: passingRecordingId } = resultMetadata.successRun.id;
  // TODO Fake build ID! We don't have the real recording data atm. Just assume it's Chromium
  const buildId = "chromium";

  const failingRecordingHref = getURL(failedRecordingId, buildId);
  const passingRecordingHref = getURL(passingRecordingId, buildId);

  return (
    <div
      className={classnames(
        "flex flex-col items-center gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white max-h-[90svh]"
      )}
      data-test-name="RCATestEntryDetails"
    >
      <div className="flex flex-row w-full truncate">
        <div className="grow basis-1/2 mr-1">
          <h4 className="text-md font-bold">Test Name</h4>
          <div> {resultMetadata.title}</div>
        </div>
        <div className="grow basis-1/2 ml-1">
          <h4 className="text-md font-bold">Recordings</h4>
          <div className="flex flex-row shrink-0 w-full">
            <div className="m-1">
              <a href={failingRecordingHref}>
                Failed:
                <div className="p-2 w-16 h-9  bg-slate-900 rounded-sm">
                  <RecordingThumbnail buildId={buildId} recordingId={failedRecordingId} />
                </div>
              </a>
            </div>
            <div className="m-1">
              <a href={passingRecordingHref}>
                Passing:
                <div className="p-2 w-16 h-9  bg-slate-900 rounded-sm">
                  <RecordingThumbnail buildId={buildId} recordingId={passingRecordingId} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <h4 className="text-md font-bold">JS Discrepancies</h4>
      <div className="flex flex-col grow overflow-y-auto w-full">{renderedJSDiscrepancies}</div>
    </div>
  );
}
