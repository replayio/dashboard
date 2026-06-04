export type AIToolCall = {
  id: string;
  input: unknown;
  isError: boolean;
  name: string;
  recordingId: string;
  result: string | null;
  sequence: number;
};

export function parseClaudeToolCalls(rawLog: string, recordingId: string): AIToolCall[] {
  const toolCalls: AIToolCall[] = [];
  const toolCallsById = new Map<string, AIToolCall>();

  for (const line of rawLog.split(/\r?\n/)) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      continue;
    }

    let event: unknown;
    try {
      event = JSON.parse(trimmedLine);
    } catch {
      continue;
    }

    const content = getMessageContent(event);
    if (!content) {
      continue;
    }

    for (const block of content) {
      if (!isObject(block)) {
        continue;
      }

      if (block.type === "tool_use") {
        const sequence = toolCalls.length + 1;
        const toolUseId = typeof block.id === "string" ? block.id : null;
        const toolCall: AIToolCall = {
          id: toolUseId ?? `${recordingId}-${sequence}`,
          input: block.input ?? null,
          isError: false,
          name: typeof block.name === "string" ? block.name : "unknown",
          recordingId,
          result: null,
          sequence,
        };

        toolCalls.push(toolCall);
        if (toolUseId) {
          toolCallsById.set(toolUseId, toolCall);
        }
      } else if (block.type === "tool_result") {
        const toolUseId = typeof block.tool_use_id === "string" ? block.tool_use_id : null;
        const toolCall = toolUseId ? toolCallsById.get(toolUseId) : undefined;
        if (toolCall) {
          toolCall.result = formatToolResultValue(block.content ?? null);
          toolCall.isError = block.is_error === true;
        }
      }
    }
  }

  return toolCalls;
}

export function formatToolValue(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value == null) {
    return "";
  }

  return JSON.stringify(value, null, 2);
}

function getMessageContent(event: unknown): unknown[] | null {
  if (!isObject(event) || !isObject(event.message)) {
    return null;
  }

  const { content } = event.message;
  return Array.isArray(content) ? content : null;
}

function formatToolResultValue(value: unknown) {
  if (Array.isArray(value)) {
    const text = value
      .map(block => {
        if (isObject(block) && typeof block.text === "string") {
          return block.text.trim();
        }
        return null;
      })
      .filter((text): text is string => Boolean(text))
      .join("\n");

    if (text) {
      return text;
    }
  }

  return formatToolValue(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
