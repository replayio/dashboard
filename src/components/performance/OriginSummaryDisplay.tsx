import { ExpandableScreenShot } from "./ExpandableScreenShot";
import { DependencyChainOrigin, OriginSummary } from "../../performance/interfaceTypes";
import { assert, formatTime } from "../../performance/utils";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";

// Displays overall information about performance for behavior triggered
// by an originating event.

function getOriginTitle(origin: DependencyChainOrigin) {
  switch (origin.kind) {
    case "documentLoad":
      return "Initial Document Load";
    case "dispatchEvent":
      return `User Event: ${origin.eventType}`;
    case "resize":
      return "User Resized Window";
    case "other":
      return "Unknown Origin";
  }
}

interface OriginSummaryProps {
  summary: OriginSummary;
}

export function OriginSummaryDisplay(props: OriginSummaryProps) {
  const { summary } = props;

  const {
    startTime,
    endTime,
    elapsed,
    networkTime,
    schedulingTime,
    mainThreadTime,
    workerThreadTime,
    timerTime,
    unknownTime,
    reactSliceTime,
    numNetworkRoundTrips,
    origin,
    originScreenShot,
    originMouseLocation,
    commitScreenShot,
  } = summary;

  const timeRender =
    (reactSliceTime["SyncRender"] ?? 0) + (reactSliceTime["ConcurrentRender"] ?? 0);
  const timeCommit = reactSliceTime["Commit"] ?? 0;
  const timeFlushPassiveEffects = reactSliceTime["FlushPassiveEffects"] ?? 0;

  const title = getOriginTitle(origin);

  let originScreenShotElement;
  if (originScreenShot) {
    originScreenShotElement = (
      <ExpandableScreenShot
        title="Before"
        scaledScreenShot={originScreenShot}
        mouseLocation={originMouseLocation}
      ></ExpandableScreenShot>
    );
  }

  const commitScreenShotElement = (
    <ExpandableScreenShot
      title="After"
      scaledScreenShot={commitScreenShot}
      mouseLocation={undefined}
    ></ExpandableScreenShot>
  );

  const otherTime = workerThreadTime + timerTime + unknownTime;

  return (
    <>
      <h3 className="text-4xl font-bold">{title}</h3>
      <div className="flex mt-2">
        <div className="shrink-0 min-w-72">
          <h4 className="text-2xl font-bold">Timings</h4>

          <div className="flex flex-col mt-2 mr-2">
            <div className="flex flex-col px-2 py-2">
              <h4 className="text-2xl font-bold">Overall</h4>
              <div className="OriginEntry">Started at: {formatTime(startTime)}</div>
              <div className="OriginEntry">Elapsed: {formatTime(elapsed)}</div>

              <div className="SummaryEntry">Network Round Trips: {numNetworkRoundTrips}</div>
            </div>
            <ExpandableSection
              grow={false}
              label={<h4 className="text-2xl  font-bold">Timing Details</h4>}
            >
              <div className="flex flex-col">
                <div className="flex flex-col px-2 py-2">
                  <h4 className="text-xl  font-bold">Breakdown</h4>
                  <div className="SummaryEntry">{"Network: " + formatTime(networkTime)}</div>
                  <div className="SummaryEntry">{"Main Thread: " + formatTime(mainThreadTime)}</div>
                  <div className="SummaryEntry">{"Scheduling: " + formatTime(schedulingTime)}</div>
                  <div className="SummaryEntry">{"Other: " + formatTime(otherTime)}</div>
                </div>
                <div className="flex flex-col px-2 py-2">
                  <h4 className="text-xl  font-bold">Main Thread</h4>
                  <div className="SummaryEntry">{"React Rendering: " + formatTime(timeRender)}</div>
                  <div className="SummaryEntry">
                    {"React Committing: " + formatTime(timeCommit)}
                  </div>
                  <div className="SummaryEntry">
                    {"React Flushing Effects: " + formatTime(timeFlushPassiveEffects)}
                  </div>
                </div>
              </div>
            </ExpandableSection>
          </div>
        </div>
        <div className="grow">
          <h4 className="text-2xl  font-bold">Screenshots</h4>
          <div className="flex grow">
            {originScreenShotElement}
            {commitScreenShotElement}
          </div>
        </div>
      </div>
    </>
  );
}
