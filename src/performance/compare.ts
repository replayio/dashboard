import assert from "assert";
import { PerformanceAnalysisResult } from "./interfaceTypes";

function getLimitingNetworkRequests(
  steps: PerformanceAnalysisResult["summaries"][number]["dependencySteps"]
) {
  const limitingRequests: {
    url: string;
    time: number;
    numBytes: number;
  }[] = [];
  for (let i = 0; i < steps.length - 1; i++) {
    const step = steps[i];
    const nextStep = steps[i + 1];
    if (step && nextStep) {
      switch (nextStep.code) {
        case "NetworkReceiveData":
        case "NetworkReceiveResource": {
          assert("url" in step);
          limitingRequests.push({
            url: step.url,
            time: (nextStep.time ?? 0) - (step.time ?? 0),
            numBytes: "numBytes" in nextStep ? nextStep.numBytes : 0,
          });
        }
      }
    }
  }
  return limitingRequests;
}

const addTime = (sum: number, request: { time: number }) => sum + request.time;
const addReceivedBytes = (sum: number, request: { receivedBytes: number }) =>
  sum + request.receivedBytes;
const addNumBytes = (sum: number, request: { numBytes: number }) => sum + request.numBytes;

type ComparisonResult<TData = unknown, TDiffs extends Record<string, number> = {}> = TData & {
  diffs: TDiffs;
  errors: string[];
};

type RequestComparisonResult = ComparisonResult<
  {
    urls: {
      previous: string;
      current: string;
    };
  },
  {
    time: number;
    receivedBytes: number;
  }
>;

type SummaryNetworkComparisonResult = ComparisonResult<
  {
    requests: RequestComparisonResult[];
  },
  {
    time: number;
    receivedBytes: number;
    roundTrips: number;
  }
>;

type SummaryComparisonResult = ComparisonResult<
  {
    network: SummaryNetworkComparisonResult;
  },
  {
    time: number;
  }
>;

type NetworkComparisonResult = ComparisonResult<
  unknown,
  {
    time: number;
    receivedBytes: number;
    roundTrips: number;
  }
>;

type PerformanceComparisonResult = ComparisonResult<
  {
    summaries: SummaryComparisonResult[];
    network: NetworkComparisonResult;
  },
  {
    time: number;
  }
>;

export function compare(
  current: PerformanceAnalysisResult,
  previous: PerformanceAnalysisResult
): PerformanceComparisonResult {
  const errors: string[] = [];
  let currentSummaries = current.summaries;
  let previousSummaries = previous.summaries;
  if (current.summaries.length !== previous.summaries.length) {
    const min = Math.min(currentSummaries.length, previousSummaries.length);
    const max = Math.max(currentSummaries.length, previousSummaries.length);
    errors.push(
      `Runs have a different number of summaries. Only first ${min} summaries were compared. Ignoring the last ${max - min} summaries.`
    );
    currentSummaries = currentSummaries.slice(0, min);
    previousSummaries = previousSummaries.slice(0, min);
  }

  const summaryComparisons = currentSummaries.map((currentSummary, i): SummaryComparisonResult => {
    const previousSummary = previousSummaries[i];
    const summaryErrors: string[] = [];
    const networkErrors: string[] = [];

    let currentLimitingNetworkRequests = getLimitingNetworkRequests(currentSummary.dependencySteps);
    let previousLimitingNetworkRequests = getLimitingNetworkRequests(
      previousSummary.dependencySteps
    );

    if (currentLimitingNetworkRequests.length !== previousLimitingNetworkRequests.length) {
      const min = Math.min(currentSummaries.length, previousSummaries.length);
      const max = Math.max(currentSummaries.length, previousSummaries.length);
      summaryErrors.push(
        `Summaries ${i} have a different number of network requests. Only first ${min} requests were compared. Ignoring the last ${max - min} requests.`
      );
      currentLimitingNetworkRequests = currentLimitingNetworkRequests.slice(0, min);
      previousLimitingNetworkRequests = previousLimitingNetworkRequests.slice(0, min);
    }

    const requestComparisons = currentLimitingNetworkRequests.map(
      (currentRequest, j): RequestComparisonResult => {
        const previousRequest = previousLimitingNetworkRequests[j];
        return {
          diffs: {
            time: currentRequest.time - previousRequest.time,
            receivedBytes: currentRequest.numBytes - previousRequest.numBytes,
          },
          urls: {
            previous: previousRequest.url,
            current: currentRequest.url,
          },
          errors: [],
        };
      }
    );

    return {
      diffs: {
        time: currentSummary.elapsed - previousSummary.elapsed,
      },
      network: {
        diffs: {
          time: currentSummary.networkTime - previousSummary.networkTime,
          // this isn't precomputed in the performance analysis result, it could be added there
          receivedBytes:
            currentLimitingNetworkRequests.reduce(addNumBytes, 0) -
            previousLimitingNetworkRequests.reduce(addNumBytes, 0),
          roundTrips: currentSummary.numNetworkRoundTrips - previousSummary.numNetworkRoundTrips,
        },
        requests: requestComparisons,
        errors: networkErrors,
      },
      errors: summaryErrors,
    };
  });

  return {
    diffs: {
      // this truly compares *last* end times, if the number of summaries is different, this will likely be way off
      // it feels like we should compute this value though and not rely on the last summary that is available in both
      time: last(current.summaries).endTime - last(current.summaries).endTime,
    },
    summaries: summaryComparisons,
    network: {
      diffs: {
        time: current.requests.reduce(addTime, 0) - previous.requests.reduce(addTime, 0),
        receivedBytes:
          current.requests.reduce(addReceivedBytes, 0) -
          previous.requests.reduce(addReceivedBytes, 0),
        roundTrips: current.requests.length - previous.requests.length,
      },
      errors: [],
    },
    errors,
  };
}

function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}
