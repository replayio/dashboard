import { describe, it, expect } from "@jest/globals";
import {
  buildDateStringToDate,
  getRecordingTarget,
  RecordingTarget,
  getURL,
  getExecutionStatus,
} from "@/utils/recording";

describe("buildDateStringToDate", () => {
  it("should parse YYYYMMDD into a Date", () => {
    const date = buildDateStringToDate("20240615");
    expect(date.getUTCFullYear()).toBe(2024);
    expect(date.getUTCMonth()).toBe(5); // 0-indexed
    expect(date.getUTCDate()).toBe(15);
  });
});

describe("getRecordingTarget", () => {
  it("should detect gecko builds", () => {
    expect(getRecordingTarget("linux-gecko-20240101")).toBe(RecordingTarget.gecko);
  });

  it("should detect chromium builds", () => {
    expect(getRecordingTarget("linux-chromium-20240101")).toBe(RecordingTarget.chromium);
  });

  it("should detect node builds", () => {
    expect(getRecordingTarget("linux-node-20240101")).toBe(RecordingTarget.node);
  });

  it("should return unknown for unrecognized builds", () => {
    expect(getRecordingTarget("linux-webkit-20240101")).toBe(RecordingTarget.unknown);
  });
});

describe("getURL", () => {
  it("should return local path for chromium recordings", () => {
    expect(getURL("rec-1", "linux-chromium-20240101")).toBe("/recording/rec-1");
  });

  it("should return local path for node recordings", () => {
    expect(getURL("rec-1", "linux-node-20240101")).toBe("/recording/rec-1");
  });

  it("should return legacy URL for gecko recordings", () => {
    expect(getURL("rec-1", "linux-gecko-20240101")).toBe(
      "https://legacy.replay.io/recording/rec-1"
    );
  });
});

describe("getExecutionStatus", () => {
  it("should return passed for passed results", () => {
    const exec = { result: "passed" };
    expect(getExecutionStatus(exec, [exec])).toBe("passed");
  });

  it("should return failed for failed/unknown results", () => {
    const exec = { result: "failed" };
    expect(getExecutionStatus(exec, [exec])).toBe("failed");
  });

  it("should return flaky for single-recording flaky result (Cypress)", () => {
    const exec = { result: "flaky" };
    expect(getExecutionStatus(exec, [exec])).toBe("flaky");
  });

  it("should return passed for the first execution in a multi-recording flaky set", () => {
    const first = { result: "flaky" };
    const second = { result: "flaky" };
    expect(getExecutionStatus(first, [first, second])).toBe("passed");
  });

  it("should return flaky for non-first executions in a multi-recording flaky set", () => {
    const first = { result: "flaky" };
    const second = { result: "flaky" };
    expect(getExecutionStatus(second, [first, second])).toBe("flaky");
  });
});
