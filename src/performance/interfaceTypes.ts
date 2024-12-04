export const PerformanceAnalysisVersion = 2;
export const DependencyGraphVersion = 4;

type ProtocolExecutionPoint = string;

// Information about a DOM mutation performed by React during a commit.
interface MutationInfo {
  // Point of the mutation.
  point: ProtocolExecutionPoint;

  // ID of the fiber being committed.
  fiberId: number;
}

// Information about a commit performed by React.
interface CommitInfo {
  // Point/time where the commit started.
  point: ProtocolExecutionPoint;
  time: number;

  // Point where the commit finished.
  afterPoint: ProtocolExecutionPoint;

  // All DOM mutations during this commit.
  mutations: MutationInfo[];
}

/** Reasons why a set of fibers might need to be rerendered. */
export enum RerenderFiberReason {
  /** The application called setState. */
  SetState = "SetState",

  /** A useSyncExternalStore subscription triggered a rerender. */
  StoreRerender = "StoreRerender",
}

export enum RenderRootFiberReason {
  RootRender = "RootRender",
  HydrateRoot = "HydrateRoot",
}

export enum UseFiberReason {
  ConstructFiber = 1 << 0,
  CreateWorkInProgress = 1 << 1,

  RenderWithHooks = 1 << 2,
  RenderWithHooksAgain = 1 << 3,
  FinishClassComponent = 1 << 4,

  UpdateContextConsumer = 1 << 5,

  CommitLayoutEffectOnFiber = 1 << 6,
  CommitMutationEffectsOnFiber = 1 << 7,
  CommitDeletionEffectsOnFiber = 1 << 8,
  CommitHostComponentMount = 1 << 9,

  MountSuspenseFallbackChildren = 1 << 10,
  UpdateSuspenseFallbackChildren = 1 << 11,

  CompleteWork = 1 << 12,
  ReconcileChildFibers = 1 << 13,
}

type RerenderTriggerReason =
  | RenderRootFiberReason
  | RerenderFiberReason
  | "SuspenseResumed"
  | "RenderSuspended";

type RerenderTrigger = {
  point: ProtocolExecutionPoint;
  reason: RerenderTriggerReason;
};

export interface RenderCommitTriggerPoint {
  // Point within React which triggered a render.
  point: ProtocolExecutionPoint;
  reason: RerenderTriggerReason;

  time: number;

  // Starting point of commits associated with this trigger.
  commitPoints: ProtocolExecutionPoint[];

  // Points where the DOM was mutated as a result of this trigger.
  mutationPoints: ProtocolExecutionPoint[];
}

interface DependencyChainOrigin {
  kind: "documentLoad" | "dispatchEvent" | "resize" | "other";
  time: number;
  eventType?: string;
}

interface FunctionInfo {
  name?: string;
  location: URLLocation;

  // return for callers or for other precise points (like consume points)
  point?: ProtocolExecutionPoint;

  // returned for callees when
  startPoint?: ProtocolExecutionPoint;
  endPoint?: ProtocolExecutionPoint;
}

interface LibraryDependencyInfo {
  point: ProtocolExecutionPoint;
  library: string;
  reason: string;
  functionInfo: FunctionInfo | undefined;
}

interface LibraryEdgeInfo {
  kind: "library";
  info: LibraryDependencyInfo;
}

type DependencyGraphEdgeInfo = {
  kind:
    | "scheduler"
    | "creator"
    | "basePromise"
    | "parentPromise"
    | "adoptedPromise"
    | "baseTimer"
    | "loadEventDelay"
    | "imageLoader";
};

type AnyEdgeInfo =
  | DependencyGraphEdgeInfo
  // Implicit edge when the source node was executing while the target was created.
  | {
      kind: "executionParent";
      executionStartTime: number;
    }
  // Implicit edge when the source node was executing while an execution point
  // associated with the target was hit.
  | {
      kind: "executionPoint";
      point: ProtocolExecutionPoint;
      executionStartTime: number;
    }
  // Implicit edge when the source is some data received over the network which
  // triggers the target.
  | {
      kind: "networkReceiveData";

      // Set if the data received is for the initial document loading. This initial
      // load does not have an associated graph node for the request itself.
      initialDocument?: boolean;
    }
  // Implicit edge when the source is a network request and the target is data
  // being received for that request.
  | { kind: "networkRequest" }
  // Implicit edge from a websocket message that was sent to an associated response.
  | { kind: "websocketMessage" }
  // Implicit edge from a websocket creation to the point where connection finished.
  | { kind: "websocketCreated" }
  // Implicit edge from code called by a library with custom handling to application
  // code which triggered the later call.
  | LibraryEdgeInfo;

interface RenderTriggerPointData extends RenderCommitTriggerPoint {
  dependencies: unknown[]; // DependencyGraphEdge[];
}

// Information tracked about an originating event in the dependency graph.
interface OriginData {
  origin: DependencyChainOrigin;
  triggers: RenderTriggerPointData[];
}

export enum ReactEventKind {
  RenderFiber = "RenderFiber",
  PassiveEffect = "PassiveEffect",
  LayoutEffect = "LayoutEffect",
}

interface URLLocation {
  sourceId: string;
  line: number;
  column: number;
  url: string;
}

// Information about an event that happens within a slice.
export interface ReactEvent {
  kind: ReactEventKind;
  callerPoint: ProtocolExecutionPoint;
  startPoint: ProtocolExecutionPoint;
  endPoint: ProtocolExecutionPoint | undefined;
  functionLocation: URLLocation | undefined;
}

interface ReactEventSummary {
  kind: ReactEventKind;
  functionLocation: URLLocation | undefined;

  // Number of times the event occurred.
  count: number;

  // Execution duration blamed on the times this event occurred.
  elapsed: number;
}

type DependencyFunctionLocation = Omit<URLLocation, "sourceId">;

type DependencyGraphNodeInfo = unknown;

type AnyNodeInfo = DependencyGraphNodeInfo | { kind: "point" };

type UnknownDependencyChainStepInfo =
  | {
      code: "UnknownNode";
      node: AnyNodeInfo;
    }
  | {
      code: "UnknownEdge";
      edge: AnyEdgeInfo;
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
      functionLocation?: DependencyFunctionLocation;
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
      functionLocation?: DependencyFunctionLocation;
      functionName?: string;
    }
  | {
      // An effect hook is called after the original useEffect/useLayoutEffect/etc created it in render.
      code: "ReactCallEffect";
      functionLocation?: DependencyFunctionLocation;
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
      code: "DocumentScriptLoaded";
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
  | { code: "CreatePromise" }
  | {
      // A promise settled and its then/catch/finally hooks were called.
      code: "PromiseSettled";
    }
  | {
      code: "CreateTimer";
    }
  | {
      code: "TimerFired";
    }
  | ReactDependencyChainStepInfo
  | UnknownDependencyChainStepInfo;

export type DependencyChainStep = DependencyChainStepInfo & {
  time?: number;
  point?: ProtocolExecutionPoint;
};

interface LimitingPathSummary {
  // Time when the event was initiated.
  startTime: number;

  // Point and time when the event occurred.
  endPoint: ProtocolExecutionPoint;
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

interface ScaledScreenShot {
  screen: string;

  // Original screen dimensions before scaling.
  originalHeight: number;
  originalWidth: number;

  // Dimensions after scaling. This can be determined from the base64 data
  // but doing this synchronously in JS is annoying.
  scaledHeight: number;
  scaledWidth: number;
}

interface MouseLocation {
  clientX: number;
  clientY: number;
}

interface OriginSummary extends LimitingPathSummary {
  origin: DependencyChainOrigin;

  // base64 screenshot at the point of the origin, present except for
  // document load origins.
  originScreenShot?: ScaledScreenShot;

  // For mouse related origins, the point on the screen where the mouse was.
  originMouseLocation?: MouseLocation;

  // base64 screenshot after the final commit in the limiting path.
  commitScreenShot: ScaledScreenShot;
}

interface RequestSummary {
  url: string;
  time: number;
  point: ProtocolExecutionPoint;
  sentBytes: number;
  receivedBytes: number;
}

interface AnalysisPointError {
  point: ProtocolExecutionPoint;
  time: number;
  why: string;
}

type PerformanceAnalysisSpec = {
  recordingId: string;
  metadata?:
    | {
        workspaceId?: string | undefined;
        workspaceName?: string | undefined;
        testTitle?: string | undefined;
        repo?: string | undefined;
        pullRequest?: number | undefined;
        branch?: string | undefined;
        commit?: string | undefined;
      }
    | undefined;
};

// Result of running the performance analysis.
export interface PerformanceAnalysisResult {
  spec: PerformanceAnalysisSpec;
  summaries: OriginSummary[];
  requests: RequestSummary[];
  errors: AnalysisPointError[];
  recordingURL: string;
}
