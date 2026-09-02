import { SessionContext } from "@/components/SessionContext";
import { URLS } from "@/constants";
import { TestSuiteTest } from "@/graphql/types";
import {
  AIToolCall,
  formatToolValue,
  parseClaudeToolCalls,
} from "@/pageComponents/team/id/runs/aiToolCallsLog";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";
import { useContext, useEffect, useMemo, useState } from "react";

const CLAUDE_RAW_LOG_FILE_NAME = "claude-raw-log.jsonl";

type ToolCallsState =
  | { status: "idle"; toolCalls: AIToolCall[] }
  | { status: "loading"; toolCalls: AIToolCall[] }
  | { status: "missing"; toolCalls: AIToolCall[] }
  | { status: "loaded"; toolCalls: AIToolCall[] }
  | { status: "error"; error: string; toolCalls: AIToolCall[] };

type RecordingToolCallsResult =
  | { status: "found"; toolCalls: AIToolCall[] }
  | { status: "missing" }
  | { status: "error"; error: string };

export function AIToolCalls({ test }: { test: TestSuiteTest }) {
  const { accessToken } = useContext(SessionContext);
  const recordingIds = useMemo(
    () =>
      Array.from(
        new Set(
          test.executions.flatMap(execution => execution.recordings.map(recording => recording.id))
        )
      ),
    [test]
  );
  const [state, setState] = useState<ToolCallsState>({
    status: "idle",
    toolCalls: [],
  });

  useEffect(() => {
    if (recordingIds.length === 0) {
      setState({ status: "idle", toolCalls: [] });
      return;
    }

    const abortController = new AbortController();

    setState({ status: "loading", toolCalls: [] });

    void fetchToolCallsForRecordings({
      accessToken,
      recordingIds,
      signal: abortController.signal,
    })
      .then(results => {
        const foundResults = results.filter(isFoundResult);
        const toolCalls = foundResults.flatMap(result => result.toolCalls);

        if (foundResults.length > 0) {
          setState({ status: "loaded", toolCalls });
          return;
        }

        const firstError = results.find(result => result.status === "error");
        if (firstError?.status === "error") {
          setState({ status: "error", error: firstError.error, toolCalls: [] });
        } else {
          setState({ status: "missing", toolCalls: [] });
        }
      })
      .catch(error => {
        if (abortController.signal.aborted) {
          return;
        }

        setState({
          status: "error",
          error: error instanceof Error ? error.message : String(error),
          toolCalls: [],
        });
      });

    return () => {
      abortController.abort();
    };
  }, [accessToken, recordingIds]);

  if (state.status === "idle" || state.status === "missing") {
    return null;
  }

  const hasMultipleRecordings = recordingIds.length > 1;

  return (
    <div
      className="bg-background text-foreground p-2 rounded"
      data-test-id="TestExecution-AIToolCalls"
    >
      <ExpandableSection
        label={
          <span className="flex min-w-0 items-center gap-2">
            <span className="truncate">AI Tool Calls</span>
            {state.toolCalls.length > 0 && (
              <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {state.toolCalls.length}
              </span>
            )}
          </span>
        }
        openByDefault
      >
        {state.status === "loading" ? (
          <div className="text-sm text-muted-foreground">Loading AI tool calls...</div>
        ) : state.status === "error" ? (
          <div className="text-sm text-muted-foreground break-words">{state.error}</div>
        ) : state.toolCalls.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No AI tool calls found in the raw log.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {state.toolCalls.map(toolCall => (
              <AIToolCallRow
                hasMultipleRecordings={hasMultipleRecordings}
                key={`${toolCall.recordingId}-${toolCall.id}`}
                toolCall={toolCall}
              />
            ))}
          </div>
        )}
      </ExpandableSection>
    </div>
  );
}

function AIToolCallRow({
  hasMultipleRecordings,
  toolCall,
}: {
  hasMultipleRecordings: boolean;
  toolCall: AIToolCall;
}) {
  const input = formatToolValue(toolCall.input);

  return (
    <div
      className="flex flex-col gap-2 bg-muted p-2 rounded shrink-0"
      data-test-name="TestExecution-AIToolCall-Row"
    >
      <div className="flex flex-row gap-2 items-center overflow-hidden">
        <div className="flex items-center justify-center bg-foreground text-background w-6 h-6 rounded shrink-0 text-xs">
          {toolCall.sequence}
        </div>
        <div className="truncate font-medium">{toolCall.name}</div>
        {toolCall.isError && (
          <div className="ml-auto shrink-0 rounded bg-rose-600 px-1.5 py-0.5 text-xs text-white">
            Error
          </div>
        )}
      </div>

      {input && (
        <pre
          className="max-h-36 overflow-auto whitespace-pre-wrap break-words bg-background text-muted-foreground p-2 rounded text-xs"
          data-test-name="TestExecution-AIToolCall-Input"
        >
          {input}
        </pre>
      )}

      {toolCall.result && (
        <pre
          className="max-h-28 overflow-auto whitespace-pre-wrap break-words bg-background text-muted-foreground p-2 rounded text-xs"
          data-test-name="TestExecution-AIToolCall-Result"
        >
          {toolCall.result}
        </pre>
      )}

      {hasMultipleRecordings && (
        <div className="truncate text-xs text-muted-foreground">{toolCall.recordingId}</div>
      )}
    </div>
  );
}

function isFoundResult(
  result: RecordingToolCallsResult
): result is Extract<RecordingToolCallsResult, { status: "found" }> {
  return result.status === "found";
}

async function fetchToolCallsForRecordings({
  accessToken,
  recordingIds,
  signal,
}: {
  accessToken: string;
  recordingIds: string[];
  signal: AbortSignal;
}): Promise<RecordingToolCallsResult[]> {
  return await Promise.all(
    recordingIds.map(recordingId =>
      fetchToolCallsForRecording({ accessToken, recordingId, signal })
    )
  );
}

async function fetchToolCallsForRecording({
  accessToken,
  recordingId,
  signal,
}: {
  accessToken: string;
  recordingId: string;
  signal: AbortSignal;
}): Promise<RecordingToolCallsResult> {
  let response: Response;
  try {
    response = await fetch(`${URLS.dispatch}/nut/fetch-analysis-artifact`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: CLAUDE_RAW_LOG_FILE_NAME,
        recordingId,
      }),
      signal,
    });
  } catch (error) {
    if (signal.aborted) {
      throw error;
    }

    return {
      status: "error",
      error: error instanceof Error ? error.message : String(error),
    };
  }

  if (response.status === 404) {
    return { status: "missing" };
  }

  if (!response.ok) {
    return {
      status: "error",
      error: `AI tool call log request failed with ${response.status} ${
        response.statusText
      }: ${await response.text()}`,
    };
  }

  return {
    status: "found",
    toolCalls: parseClaudeToolCalls(await response.text(), recordingId),
  };
}
