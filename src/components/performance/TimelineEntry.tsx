import classnames from "classnames";
import { RecordingLink } from "./RecordingLink";
import { DependencyChainStep } from "../../performance/interfaceTypes";
import { formatTime } from "../../performance/utils";

// Displays a timeline entry in an origin's limiting path.

function getDescription(step: DependencyChainStep): string {
  switch (step.code) {
    case "DocumentBeginLoad":
      return `Document begins loading`;
    case "DocumentExecuteBlockedScript":
      return `Executed a script blocked by other resources`;
    case "DocumentInitiateNetworkRequest":
      return `Request started for a document URL`;
    case "DocumentAsyncCompileScript":
      return `Script was scheduled for asynchronous compilation`;
    case "DocumentExecuteScript":
      return `Script started executing`;
    case "NetworkReceiveData":
      return `Received ${step.numBytes} bytes of data`;
    case "NetworkReceiveResource":
      return `Received the entire resource`;
    case "DispatchInputEventHandler":
      return `An input ${step.type} event was dispatched`;
    case "ScriptInitiateNetworkRequest":
      return `Script started a network request`;
    case "ScriptCreateWebSocket":
      return `Script created a WebSocket`;
    case "ScriptSendWebSocketMessage":
      return `Script sent a WebSocket message`;
    case "WebSocketConnected":
      return `New WebSocket connected`;
    case "WebSocketMessageReceived":
      return `Received a WebSocket response`;
    case "ReactHydrateRoot":
      return `React hydration started`;
    case "ReactRender":
      return `React rendered a component`;
    case "ReactResumeSuspendedRender":
      return `React resumed a suspended render`;
    case "ReactReturnElement":
      return `Component render returned a new component`;
    case "ReactCreateElement":
      return `Component render created a new component`;
    case "ReactExternalStoreRerender":
      return `A store external to React triggered a rerender`;
    case "ReactCallEffect":
      return `Component render called useEffect()`;
    case "ReactCreateEffect":
      return `Effect function called for the first time`;
    case "ReactRootRender":
      return `The React root component was rendered`;
    case "ReactCallSetState":
      return `Script called setState()`;
    case "ReactRenderCommit":
      return `A change triggered a React render which was later committed`;
  }
  console.log("UnknownEntry", step);
  return "Entry: " + step.code;
}

export function isNetworkResponse(step: DependencyChainStep) {
  switch (step.code) {
    case "NetworkReceiveData":
    case "NetworkReceiveResource":
    case "WebSocketConnected":
    case "WebSocketMessageReceived":
      return true;
  }
  return false;
}

export interface TimelineEntryProps {
  step: DependencyChainStep;
  previous: DependencyChainStep | null;
  next: DependencyChainStep | null;
}

export function TimelineEntry(props: TimelineEntryProps) {
  const { step, previous, next } = props;

  const children: React.ReactNode[] = [];

  children.push(<div key="description">{getDescription(step)}</div>);

  let timeToDisplay: React.ReactNode = formatTime(step.time ?? 0);
  if (step.point) {
    timeToDisplay = (
      <RecordingLink
        className="TimelineEntryPoint"
        text={timeToDisplay}
        point={step.point}
        time={step.time ?? 0}
      ></RecordingLink>
    );
  }

  if ("url" in step) {
    children.push(
      <div className="TimelineURL" key="url">
        {"URL: " + step.url}
      </div>
    );
  }

  if ("functionLocation" in step && step.functionLocation) {
    const { url, line } = step.functionLocation;
    const { functionName } = step;
    const componentName = functionName ? `<${functionName}> ` : "";
    children.push(
      <div className="TimelineLocation" key="location">
        {componentName} ( {url}:{line} )
      </div>
    );
  }

  const networkRequest = next && isNetworkResponse(next);
  const networkResponse = isNetworkResponse(step);
  const className = classnames("mb-2", {
    TimelineEntryNetworkRequest: networkRequest,
    TimelineEntryNetworkResponse: networkResponse,
    TimelineEntry: !networkRequest && !networkResponse,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <span className="TimelineEntryTime" key="time" style={{ width: "90px" }}>
        {timeToDisplay}
      </span>
      <div
        className={className}
        key="description"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {children}
      </div>
    </div>
  );
}
