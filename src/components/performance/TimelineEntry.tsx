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
    case "ReactCallUseEffect":
      return `Component render called useEffect()`;
    case "ReactEffectFirstCall":
      return `Effect function called for the first time`;
    case "ReactCallSetState":
      return `Script called setState()`;
    case "ReactRenderCommit":
      return `A change triggered a React render which was later committed`;
  }
  return "Entry: " + step.code;
}

function isNetworkResponse(step: DependencyChainStep) {
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
}

export function TimelineEntry(props: TimelineEntryProps) {
  const { step, previous } = props;

  const children: any[] = [];
  children.push(<div className="TimelineDescription">{getDescription(step)}</div>);
  children.push(<div className="TimelineTime">{"Time: " + formatTime(step.time ?? 0)}</div>);

  if (previous) {
    const elapsed = (step.time ?? 0) - (previous.time ?? 0);
    children.push(<div className="TimelineTime">{"Elapsed: " + formatTime(elapsed)}</div>);
  }

  if (step.point) {
    children.push(
      <RecordingLink
        className="TimelineEntryPoint"
        text="Point"
        point={step.point}
        time={step.time ?? 0}
      ></RecordingLink>
    );
  }

  if ("url" in step) {
    children.push(<div className="TimelineURL">{"URL: " + step.url}</div>);
  }

  if ("calleeLocation" in step && step.calleeLocation) {
    const { url, line } = step.calleeLocation;
    children.push(<div className="TimelineLocation">{`Location: ${url}:${line}`}</div>);
  }

  const className = isNetworkResponse(step) ? "TimelineEntryNetwork" : "TimelineEntry";

  return <div className={className}>{children}</div>;
}
