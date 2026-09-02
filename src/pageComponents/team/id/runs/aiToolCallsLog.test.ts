import { describe, expect, it } from "@jest/globals";
import { formatToolValue, parseClaudeToolCalls } from "./aiToolCallsLog";

describe("parseClaudeToolCalls", () => {
  it("extracts Claude tool calls and attaches matching tool results", () => {
    const rawLog = [
      JSON.stringify({
        type: "assistant",
        message: {
          content: [
            {
              type: "tool_use",
              id: "toolu_1",
              name: "Bash",
              input: { command: "pnpm test" },
            },
          ],
        },
      }),
      "not json",
      JSON.stringify({
        type: "user",
        message: {
          content: [
            {
              type: "tool_result",
              tool_use_id: "toolu_1",
              content: "tests passed",
            },
          ],
        },
      }),
      JSON.stringify({
        type: "assistant",
        message: {
          content: [
            {
              type: "tool_use",
              id: "toolu_2",
              name: "Read",
              input: { file_path: "src/App.tsx" },
            },
          ],
        },
      }),
      JSON.stringify({
        type: "user",
        message: {
          content: [
            {
              type: "tool_result",
              tool_use_id: "toolu_2",
              content: [{ text: "file contents", type: "text" }],
              is_error: true,
            },
          ],
        },
      }),
    ].join("\n");

    expect(parseClaudeToolCalls(rawLog, "recording-1")).toEqual([
      {
        id: "toolu_1",
        input: { command: "pnpm test" },
        isError: false,
        name: "Bash",
        recordingId: "recording-1",
        result: "tests passed",
        sequence: 1,
      },
      {
        id: "toolu_2",
        input: { file_path: "src/App.tsx" },
        isError: true,
        name: "Read",
        recordingId: "recording-1",
        result: "file contents",
        sequence: 2,
      },
    ]);
  });
});

describe("formatToolValue", () => {
  it("formats strings and structured values for display", () => {
    expect(formatToolValue(" value \n")).toBe("value");
    expect(formatToolValue({ command: "pnpm test" })).toBe('{\n  "command": "pnpm test"\n}');
  });
});
