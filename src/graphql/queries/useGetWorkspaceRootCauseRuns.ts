import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { gql } from "@apollo/client";
import assert from "assert";
import { useMemo } from "react";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";
import {
  ExecutionPoint,
  FunctionOutline,
  MappedLocation,
  Object as ProtocolObject,
  RequestInitiator,
  TimeStampedPoint,
} from "@replayio/protocol";

// TODO Port types from the backend
interface RCADiscrepancy {
  id: string;
  kind: string;
  eventKind: string;
  key: string;
  event: AnyDiscrepancy["event"];
}

// Kinds of discrepancies that can happen in a test failure.
export enum DiscrepancyKind {
  // Something extra happened in the failure but not in any successful run.
  Extra = "Extra",

  // Something didn't happen in the failure but happened in every successful run.
  Missing = "Missing",
}

// Information that must be present in events associated with discrepancies.
export interface DiscrepancyEvent {
  // Point in the associated recording where the event occurred.
  point: ExecutionPoint;
  time: number;

  // Key identifying the event. All events in a run must have distinct keys,
  // and keys between different runs must be comparable.
  key: string;
}

// Information about a discrepancy identified in a test failure.
export interface Discrepancy<T extends DiscrepancyEvent> {
  // The kind of discrepancy.
  kind: DiscrepancyKind;

  // The kind of underlying event.
  eventKind: string;

  // Any ID for a sequence of discrepancies this is associated with.
  sequenceId: string;

  // Information about the discrepancy. For Extra this describes an event that
  // happened in the failing run, for Missing this describes an event that happened
  // in a particular successful run.
  event: T;

  // Point for the most recent event in the failed run that also matches up with an
  // event in the successful run.
  commonPoint: ExecutionPoint;
}

// Information about a statement that executed within a recording.
export interface ExecutedStatement extends DiscrepancyEvent {
  // Location of the statement.
  location: MappedLocation;
}

export interface LocationDescription {
  sourceId: string;
  url: string | undefined;
  line: number;
  column: number;
  functionText?: string[];
  functionOutline?: FunctionOutline;
  text?: string;
}

// Reported discrepancies for executed statements include a description of the
// statement which is either extra or missing in the failed run.
interface ExecutedStatementWithDescription extends ExecutedStatement {
  description?: LocationDescription;
}

interface NetworkEventContentsRequest {
  kind: "Request";
  requestUrl: string;
  requestMethod: string;
  requestTag: string | undefined;
  responseCode: number | undefined;
  initiator: RequestInitiator | undefined;
}

type ValueArrayLiteral = Array<number | boolean | string>;
type ValueLiteral = void | number | boolean | string | ValueArrayLiteral;

// A specific literal value.
interface ComparableValueLiteral {
  kind: "Literal";
  v: ValueLiteral;
}

type ValueType = "undefined" | "number" | "boolean" | "string" | "array";

// A type of value.
interface ComparableValueType {
  kind: "Type";
  type: ValueType;
}

// Topmost element in the partial order, matches any other value.
interface ComparableValueAny {
  kind: "Any";
}

export type ComparableValue = ComparableValueLiteral | ComparableValueType | ComparableValueAny;

interface NetworkEventContentsResponseJSON {
  kind: "ResponseJSON";

  // Information about the associated request.
  requestUrl: string;
  requestTag: string | undefined;

  // Path to the JSON value being described.
  path: string;

  // Value in the JSON at the associated path.
  value: ComparableValue;
}

export type NetworkEventContents = NetworkEventContentsRequest | NetworkEventContentsResponseJSON;

export interface NetworkEvent extends DiscrepancyEvent {
  requestId: string;
  data: NetworkEventContents;
}

// Reported discrepancies for the contents of network requests/responses include
// a description of what the corresponding content is in the other run.
interface NetworkEventWithAlternate extends NetworkEvent {
  alternate?: NetworkEventContents;
}

enum ReactComponentChange {
  Add = "Add",
  Remove = "Remove",
}

// Information about a change to a react component.
export interface ReactComponent extends DiscrepancyEvent {
  nodeName: string;
  change: ReactComponentChange;
}

// Discrepancy in the result of a global evaluation at the failure point in the
// failed vs. passing recordings.
interface CustomSpecGlobalEval {
  kind: "GlobalEval";
  expression: string;
}

// Discrepancy in the result of evaluating an expression at the last time some
// statement executed before the failure.
interface CustomSpecFrameEval {
  kind: "FrameEval";
  expression: string;

  // URL where we should look for the source to evaluate the expression.
  url: string;

  // Text for the statement within the URL to evaluate the expression at.
  fragment: string;
}

// Specification for a custom discrepancy to check for.
export type CustomSpec = CustomSpecGlobalEval | CustomSpecFrameEval;

// Information about an event associated with a custom discrepancy spec.
export interface CustomEvent extends DiscrepancyEvent {
  // Discrepancy which we checked for.
  custom: CustomSpec;

  // Any value produced by an evaluation in the discrepancy.
  value?: ComparableValue;
}

export type ExecutedStatementDiscrepancy = Discrepancy<ExecutedStatementWithDescription>;
export type ReactComponentDiscrepancy = Discrepancy<ReactComponent>;
export type NetworkEventDiscrepancy = Discrepancy<NetworkEventWithAlternate>;
export type CustomEventDiscrepancy = Discrepancy<CustomEvent>;

export type AnyDiscrepancy =
  | ExecutedStatementDiscrepancy
  | ReactComponentDiscrepancy
  | NetworkEventDiscrepancy
  | CustomEventDiscrepancy;

// Unique identifier for a test.
export interface TestId {
  recordingId: string;
  testId: number;
  attempt: number;
}

// Describes a test run handled by the root cause analysis.
export interface TestRunInfo {
  // Test which was analyzed.
  id: TestId;

  // Range of the recording in which the test ran.
  start: TimeStampedPoint;
  end: TimeStampedPoint;

  // Any earlier endpoint for the range which was analyzed.
  analyzeEndpoint?: TimeStampedPoint;

  // In a failed recording, the endpoint at which the last steps were repeated
  // the same number of times as in each passing recording.
  failureRepeatEndpoint?: TimeStampedPoint;
}

interface ExecutedStatementDiscrepancySpec {
  kind: "ExecutedStatement";
  discrepancyKind: DiscrepancyKind;
  key: string;
  url: string;
}

interface ReactComponentDiscrepancySpec {
  kind: "ReactComponent";
  discrepancyKind: DiscrepancyKind;
  key: string;
}

interface NetworkEventDiscrepancySpec {
  kind: "NetworkEvent";
  discrepancyKind: DiscrepancyKind;
  key: string;
}

// Discrepancies in a signature can be custom specs or describe discrepancies
// automatically found by the RCA.
export type DiscrepancySpec =
  | CustomSpec
  | ExecutedStatementDiscrepancySpec
  | ReactComponentDiscrepancySpec
  | NetworkEventDiscrepancySpec;

export interface TestFailureSignature {
  // Description and associated URL to use for failures matching this signature.
  title: string;
  url: string;

  // Associated priority, with lower numbers being higher priority. If a failure
  // matches multiple signatures then the label used will be the highest priority,
  // or the first one in the signatures array in the case of tied priorities.
  priority: number;

  // Specs for discrepancies matching this signature.
  discrepancies: DiscrepancySpec[];
}

// Encodes the result of analyzing a flaky test failure.
export interface RootCauseAnalysisTestResult {
  title: string;

  // The failed test run which was analyzed.
  failedRun: TestRunInfo;

  // A particular successful run which the discrepancies will be in relation to.
  successRun: TestRunInfo;

  // Additional successful runs which were analyzed.
  additionalSuccessRuns: TestRunInfo[];

  // Discrepancies found while analyzing the failure.
  // discrepancies: AnyDiscrepancy[];

  // Frame data for the failing run.
  failingFrames: FormattedFrame[];

  // The highest priority signature which matches this failure, if any.
  matchingSignature?: TestFailureSignature;

  version: 2;
}

export interface Exception {
  // Location of the statement.
  location: MappedLocation;
  // Description of an exception's error, where available.
  error?: ProtocolObject;
}
export interface LineExecutionDiscrepancy {
  [DiscrepancyKind.Extra]?: ExecutionPoint;
  [DiscrepancyKind.Missing]?: ExecutionPoint;
}

export interface FormattedFrame {
  key: string;
  sourceId: string;
  url?: string;
  functionName: string;
  line: number;
  sourceLines: string[];
  discrepancies: Record<number, LineExecutionDiscrepancy>;
  exceptions?: Exception[];
}

export interface RCATestEntry {
  id: string;
  // Added on the client, but whatever
  runId: string;
  createdAt: string;
  resultMetadata: RootCauseAnalysisTestResult;
  discrepancies: Array<RCADiscrepancy>;
}

export type RCATestEntryWithoutDiscrepancies = Omit<RCATestEntry, "discrepancies">;

export interface RCARunWithoutDiscrepancies {
  id: string;
  createdAt: string;
  metadata: Record<string, unknown>;
  result: string;
  testEntries: Array<RCATestEntryWithoutDiscrepancies>;
}

// Hand-written for now, since I can't introspect Hasura in Cloud Dev
interface GetWorkspaceRootCauseRunsQuery {
  node: {
    rootCauseAnalysisRuns: {
      edges: Array<{
        node: RCARunWithoutDiscrepancies;
      }>;
    };
  };
}

interface GetWorkspaceRootCauseRunsQueryVariables {
  workspaceId: string;
}

export interface RCARun {
  id: string;
  createdAt: string;
  metadata: Record<string, unknown>;
  result: string;
  testEntries: Array<RCATestEntry>;
}

// Hand-written for now, since I can't introspect Hasura in Cloud Dev
interface GetWorkspaceRootCauseTestEntryQuery {
  node: {
    rootCauseAnalysisRuns: {
      edges: Array<{
        node: RCARun;
      }>;
    };
  };
}

interface GetWorkspaceRootCauseTestEntryQueryVariables {
  workspaceId: string;
  runId: string;
  testEntryId: string;
}

// TODO Update backend to allow filtering on status / creation date, and do ordering
// TOOD Update backend to allow fetching an individual test entry by ID
// TODO stop fetching all discrepancies up front, and only fetch when an entry is selected

export function useWorkspaceRootCauseRuns(workspaceId: string) {
  const {
    data,
    error: didError,
    isLoading,
  } = useGraphQLQuery<GetWorkspaceRootCauseRunsQuery, GetWorkspaceRootCauseRunsQueryVariables>(
    gql`
      query GetWorkspaceRootCauseRuns($workspaceId: ID!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            rootCauseAnalysisRuns(filter: { status: "Success", startTime: "2024-05-28" }) {
              edges {
                node {
                  id
                  createdAt
                  metadata
                  result
                  testEntries(filter: {}) {
                    id
                    createdAt
                    resultMetadata
                  }
                }
              }
            }
          }
        }
      }
    `,
    { workspaceId }
  );

  const runs = useMemo<RCATestEntryWithoutDiscrepancies[]>(() => {
    if (isLoading || didError) {
      return [];
    }

    assert(
      data?.node?.rootCauseAnalysisRuns?.edges,
      `RCA runs could not be loaded for workspace "${workspaceId}"`
    );

    const recentSuccessfulAnalysisTestResults = getTestEntriesFromRunsQueryResults(
      data
    ) as RCATestEntryWithoutDiscrepancies[];

    console.log("Recent successful analysis test results: ", recentSuccessfulAnalysisTestResults);
    return recentSuccessfulAnalysisTestResults;
  }, [data, didError, workspaceId, isLoading]);

  return { didError, isLoading, runs };
}

export function useWorkspaceRootCauseTestEntryDetails(
  workspaceId: string,
  runId: string,
  testEntryId: string
) {
  const {
    data,
    error: didError,
    isLoading,
  } = useGraphQLQuery<
    GetWorkspaceRootCauseTestEntryQuery,
    GetWorkspaceRootCauseTestEntryQueryVariables
  >(
    gql`
      query GetWorkspaceRootCauseRuns($workspaceId: ID!, $runId: String!, $testEntryId: String!) {
        node(id: $workspaceId) {
          ... on Workspace {
            id
            rootCauseAnalysisRuns(
              filter: { status: "Success", startTime: "2024-05-28", runId: $runId }
            ) {
              edges {
                node {
                  id
                  createdAt
                  metadata
                  result
                  testEntries(filter: { testEntryId: $testEntryId }) {
                    id
                    createdAt
                    resultMetadata
                    discrepancies {
                      id
                      kind
                      eventKind
                      key
                      event
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    { workspaceId, runId, testEntryId }
  );

  const analysisTestEntry = useMemo<RCATestEntry | null>(() => {
    if (isLoading || didError) {
      return null;
    }

    assert(
      data?.node?.rootCauseAnalysisRuns?.edges,
      `RCA runs could not be loaded for workspace "${workspaceId}"`
    );

    const recentSuccessfulAnalysisTestResults = getTestEntriesFromRunsQueryResults(
      data
    ) as RCATestEntry[];

    console.log(
      "Selected successful analysis test entry details: ",
      recentSuccessfulAnalysisTestResults
    );
    return recentSuccessfulAnalysisTestResults[0] || null;
  }, [data, didError, workspaceId, isLoading]);

  return { didError, isLoading, analysisTestEntry };
}

function getTestEntriesFromRunsQueryResults(
  data: GetWorkspaceRootCauseRunsQuery | GetWorkspaceRootCauseTestEntryQuery
) {
  const allAnalysisRuns = data.node.rootCauseAnalysisRuns.edges.map(({ node }) => node);
  console.log("All analysis runs: ", allAnalysisRuns);
  const now = new Date();
  const recentSuccessfulAnalysisTestResults = allAnalysisRuns
    .filter(run => {
      const runDate = new Date(run.createdAt);
      const diff = differenceInCalendarDays(now, runDate);
      return run.result === "Success" && diff < 7;
    })
    .map(run =>
      run.testEntries.map(testEntry => ({
        ...testEntry,
        runId: run.id,
      }))
    )
    .flat();
  return recentSuccessfulAnalysisTestResults;
}

export function isExecutedStatementDiscrepancy(
  discrepancy: AnyDiscrepancy
): discrepancy is ExecutedStatementDiscrepancy {
  return discrepancy.eventKind == "ExecutedStatement";
}
