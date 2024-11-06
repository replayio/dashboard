export const PerformanceAnalysisVersion = 2;
export const DependencyGraphVersion = 4;

type ProtocolExecutionPoint = string;

export interface PerformanceAnalysisSpec {
  // Associated recording ID.
  recordingId: string;

  // Trigger points to look at.
  triggerPoints?: ProtocolExecutionPoint[];
}

export type ReactEventKind = "RenderFiber" | "PassiveEffect" | "LayoutEffect";

export interface URLLocation {
  line: number;
  column: number;
  url: string;
}

// Summary information about all the times a react event occurred in a limiting path.
interface ReactEventSummary {
  kind: ReactEventKind;
  functionLocation: URLLocation | undefined;
  functionName: string | undefined;

  // Number of times the event occurred.
  count: number;

  // Execution duration blamed on the times this event occurred.
  elapsed: number;
}

type UnknownDependencyChainStepInfo =
  | {
      code: "UnknownNode";
      node: unknown;
    }
  | {
      code: "UnknownEdge";
      edge: unknown;
    };

type ReactDependencyChainStepInfo =
  | {
      // React's createRoot(...).render() was called.
      code: "ReactRootRender";
    }
  | {
      // React hydration has started.
      code: "ReactHydrateRoot";
    }
  | {
      // React has rendered a component.
      code: "ReactRender";
      functionLocation?: URLLocation;
      functionName?: string;
    }
  | {
      // React was able to resume rendering after a suspense promise resolved.
      code: "ReactResumeSuspendedRender";
    }
  | {
      // An application render function returned an existing element object for
      // converting into a component.
      code: "ReactReturnElement";
    }
  | {
      // An application render function created an element object for converting
      // into a component.
      code: "ReactCreateElement";
    }
  | {
      // An application render function called setState().
      code: "ReactCallSetState";
    }
  | {
      // A React external store triggered a rerender.
      code: "ReactExternalStoreRerender";
    }
  | {
      // An application render function called useEffect/useLayoutEffect/etc.
      code: "ReactCreateEffect";
      functionLocation?: URLLocation;
      functionName?: string;
    }
  | {
      // An effect hook is called after the original useEffect/useLayoutEffect/etc created it in render.
      code: "ReactCallEffect";
      functionLocation?: URLLocation;
      functionName?: string;
    }
  | {
      // A change which triggered a render led to a later commit.
      code: "ReactRenderCommit";
    };

type DependencyChainStepInfo =
  | {
      // The document has started to load.
      code: "DocumentBeginLoad";
      url: string;
    }
  | {
      // A script in a document began execution after all other required
      // resources were received.
      code: "DocumentExecuteBlockedScript";
      url: string;
    }
  | {
      // A script in a document began execution after being downloaded.
      code: "DocumentExecuteScript";
      url: string;
    }
  | {
      // A script in a document has been scheduled for async compilation.
      code: "DocumentAsyncCompileScript";
      url: string;
    }
  | {
      // A network request referenced by a document's contents was initiated.
      code: "DocumentInitiateNetworkRequest";
      url: string;
    }
  | {
      // A script triggered a network request.
      code: "ScriptInitiateNetworkRequest";
      url: string;
    }
  | {
      // Some data has been received over the network.
      code: "NetworkReceiveData";
      numBytes: number;
    }
  | {
      // A network resource finished being received.
      code: "NetworkReceiveResource";
    }
  | {
      // Event handlers for user input were called.
      code: "DispatchInputEventHandler";
      type: string;
    }
  | {
      // A script created a new websocket.
      code: "ScriptCreateWebSocket";
      url: string;
    }
  | {
      // A websocket connected and open handlers were called.
      code: "WebSocketConnected";
    }
  | {
      // A script sent a message over a websocket. It was determined that this is a request for a message received and handled later.
      code: "ScriptSendWebSocketMessage";
    }
  | {
      // A websocket message received and message handlers were called.
      code: "WebSocketMessageReceived";
    }
  | {
      code: "PostMessageReceived";
      time: number;
    }
  | {
      // A promise settled and its then/catch hooks were called.
      code: "PromiseSettled";
    }
  | ReactDependencyChainStepInfo
  | UnknownDependencyChainStepInfo;

export type DependencyChainStep = DependencyChainStepInfo & {
  time?: number;
  point?: ProtocolExecutionPoint;
};

// Summary of the time contributing to the delay involved in the limiting path
// for an event.
export interface LimitingPathSummary {
  // Time when the event was initiated.
  startTime: number;

  // Time when the event occurred.
  endTime: number;

  // Total time elapsed between startTime and endTime.
  elapsed: number;

  // Breakdown of the delay between startTime and endTime.
  networkTime: number;
  schedulingTime: number;
  mainThreadTime: number;
  workerThreadTime: number;
  timerTime: number;
  unknownTime: number;

  // How much time was spent on different React activity.
  reactSliceTime: { [kind: string /*ReactSliceKind*/]: number };
  reactEventTime: { [kind: string /*ReactEventKind*/]: number };

  // How much time was spent in different React events.
  reactEvents: ReactEventSummary[];

  // How many network round trips occurred before the event occurred.
  numNetworkRoundTrips: number;

  // Information about each edge in the dependency chain.
  dependencySteps: DependencyChainStep[];
}

export interface DependencyChainOrigin {
  kind: "documentLoad" | "dispatchEvent" | "resize" | "other";
  time: number;
  eventType?: string;
}

export interface ScaledScreenShot {
  screen: string;
  originalHeight: number;
  originalWidth: number;
  scaledHeight: number;
  scaledWidth: number;
}

export interface MouseLocation {
  clientX: number;
  clientY: number;
}

export interface OriginSummary extends LimitingPathSummary {
  origin: DependencyChainOrigin;
  originScreenShot?: ScaledScreenShot;
  originMouseLocation?: MouseLocation;
  commitScreenShot: ScaledScreenShot;
}

export interface AnalysisPointError {
  point: ProtocolExecutionPoint;
  why: string;
}

export interface PerformanceAnalysisResult {
  spec: PerformanceAnalysisSpec;
  summaries: OriginSummary[];
  errors: AnalysisPointError[];
  recordingURL: string;
}
