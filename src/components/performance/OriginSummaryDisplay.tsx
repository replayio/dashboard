import { ExpandableScreenShot } from "./ExpandableScreenShot";
import { DependencyChainOrigin, OriginSummary } from "../../performance/interfaceTypes";
import { assert, formatTime } from "../../performance/utils";

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
    <span>
      <div className="OriginTitle">{title}</div>
      {originScreenShotElement}
      {commitScreenShotElement}
      <div className="OriginEntry">{"Start Time: " + formatTime(startTime)}</div>
      <div className="OriginEntry">{"Elapsed: " + formatTime(elapsed)}</div>

      <div className="SummaryTitle">Timing</div>
      <div className="SummaryEntry">{"Network: " + formatTime(networkTime)}</div>
      <div className="SummaryEntry">{"Main Thread: " + formatTime(mainThreadTime)}</div>
      <div className="SummaryEntry">{"Scheduling: " + formatTime(schedulingTime)}</div>
      <div className="SummaryEntry">{"Other: " + formatTime(otherTime)}</div>

      <div className="SummaryTitle">Network</div>
      <div className="SummaryEntry">{"Round Trips: " + numNetworkRoundTrips}</div>

      <div className="SummaryTitle">Main Thread</div>
      <div className="SummaryEntry">{"React Rendering: " + formatTime(timeRender)}</div>
      <div className="SummaryEntry">{"React Committing: " + formatTime(timeCommit)}</div>
      <div className="SummaryEntry">
        {"React Flushing Effects: " + formatTime(timeFlushPassiveEffects)}
      </div>
    </span>
  );
}
