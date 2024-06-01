import { useMemo } from "react";
import classnames from "classnames";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";
import mapValues from "lodash/mapValues";

import { Icon } from "@/components/Icon";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";

import {
  ExecutedStatementDiscrepancy,
  FormattedFrame,
  NetworkEventDiscrepancy,
  RCADiscrepancy,
  RCATestEntry,
  isExecutedStatementDiscrepancy,
  useWorkspaceRootCauseTestEntryDetails,
} from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { User, Workspace, WorkspaceRecording } from "@/graphql/types";
import { formatDuration, formatRelativeTime } from "@/utils/number";
import { RecordingThumbnail } from "@/pageComponents/team/id/recordings/RecordingThumbnail";
import { getURL } from "@/utils/recording";
import { RCAJSFunctionDiscrepancy } from "./RCAJSFunctionDiscrepancy";
import { RCANetworkDiscrepancyDisplay } from "./RCANetworkDiscrepancy";

function FramesForURL({
  url,
  frames,
  workspaceId,
  analysisTestEntry,
  discrepanciesByKindAndPoint,
}: {
  url: string;
  frames: FormattedFrame[];
  workspaceId: string;
  analysisTestEntry: RCATestEntry;
  discrepanciesByKindAndPoint: Record<string, Record<string, ExecutedStatementDiscrepancy>>;
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
          discrepanciesByKindAndPoint={discrepanciesByKindAndPoint}
        />
      </div>
    );
  });

  return (
    <ExpandableSection label={<h4 className="mb-1 font-mono text-sm">{url}</h4>}>
      {renderedJSDiscrepancies}
    </ExpandableSection>
  );
}

const NO_DISCREPANCIES: RCADiscrepancy[] = [];

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

  const discrepancies = analysisTestEntry?.discrepancies ?? NO_DISCREPANCIES;

  const discrepanciesByEventKind = useMemo(() => {
    return groupBy(discrepancies, d => d.eventKind) as unknown as {
      ExecutedStatement: ExecutedStatementDiscrepancy[];
      NetworkEvent: NetworkEventDiscrepancy[];
    };
  }, [discrepancies]);

  const jsDiscrepanciesByKindAndPoint = useMemo(() => {
    const discrepanciesByKind = groupBy(discrepanciesByEventKind.ExecutedStatement, d => d.kind);

    return mapValues(discrepanciesByKind, discrepancies => {
      const discrepanciesByPoint: Record<string, ExecutedStatementDiscrepancy> = {};
      for (const d of discrepancies) {
        discrepanciesByPoint[d.event.point] = d;
      }
      return discrepanciesByPoint;
    });
  }, [discrepanciesByEventKind]);

  const networkDiscrepanciesByPoint = useMemo(() => {
    return groupBy(discrepanciesByEventKind.NetworkEvent, d => d.event.point);
  }, [discrepanciesByEventKind]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!analysisTestEntry) {
    return <div>Failed to load test entry details</div>;
  }

  const { resultMetadata } = analysisTestEntry;
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
        discrepanciesByKindAndPoint={jsDiscrepanciesByKindAndPoint}
      />
    );
  });

  const sortedNetworkDiscrepancies = sortBy(
    Object.entries(networkDiscrepanciesByPoint),
    ([point]) => point
  );

  const renderedNetworkDiscrepancies = sortedNetworkDiscrepancies.map(([point, discrepancies]) => {
    return (
      <RCANetworkDiscrepancyDisplay
        key={point}
        analysisTestEntry={analysisTestEntry}
        workspaceId={workspaceId}
        networkDiscrepancies={discrepancies}
      />
    );
  });

  const { recordingId: failedRecordingId } = resultMetadata.failedRun.id;
  const { recordingId: passingRecordingId } = resultMetadata.successRun.id;
  // TODO Fake build ID! We don't have the real recording data atm. Just assume it's Chromium
  const buildId = "chromium";

  const failingRecordingHref = getURL(failedRecordingId, buildId);
  const passingRecordingHref = getURL(passingRecordingId, buildId);

  const failingRecordingLink = `${failingRecordingHref}?point=${resultMetadata.failedRun.start.point}`;
  const passingRecordingLink = `${passingRecordingHref}?point=${resultMetadata.successRun.start.point}`;

  return (
    <div
      className={classnames("flex flex-col items-center gap-4  text-white max-h-[90svh]")}
      data-test-name="RCATestEntryDetails"
    >
      <div className="flex flex-row w-full truncate min-h-24">
        <div className="mr-1 grow basis-1/2">
          <h4 className="font-bold text-md">Test Name</h4>
          <div> {resultMetadata.title}</div>
        </div>
        <div className="ml-1 grow basis-1/2">
          <h4 className="font-bold text-md">Recordings</h4>
          <div className="flex flex-row w-full shrink-0">
            <div className="m-1">
              <a href={failingRecordingLink}>
                Failed:
                <div className="w-16 p-2 rounded-sm h-9 bg-slate-900">
                  <RecordingThumbnail buildId={buildId} recordingId={failedRecordingId} />
                </div>
              </a>
            </div>
            <div className="m-1">
              <a href={passingRecordingLink}>
                Passing:
                <div className="w-16 p-2 rounded-sm h-9 bg-slate-900">
                  <RecordingThumbnail buildId={buildId} recordingId={passingRecordingId} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full overflow-y-auto grow">
        <h4 className="font-bold text-md">JS Discrepancies</h4>
        <div className="flex flex-col w-full grow">{renderedJSDiscrepancies}</div>
        <h4 className="mt-2 font-bold text-md">Network Discrepancies</h4>
        <div className="flex flex-col w-full grow">{renderedNetworkDiscrepancies}</div>
      </div>
    </div>
  );
}
