import assert from "assert";
import {
  DependencyChainOrigin,
  OriginSummary,
  PerformanceAnalysisResult,
  ScaledScreenShot,
} from "./interfaceTypes";

type NetworkRequestBasicTotals = {
  url: string;
  time: number;
  receivedBytes: number;
};

function getLimitingNetworkRequests(
  steps: PerformanceAnalysisResult["summaries"][number]["dependencySteps"]
) {
  const limitingRequests: NetworkRequestBasicTotals[] = [];
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
            receivedBytes: "numBytes" in nextStep ? nextStep.numBytes : 0,
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

export type RequestComparisonResult = ComparisonResult<
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

export type SummaryNetworkComparisonResult = ComparisonResult<
  {
    maxPreviousNetworkTotals: NetworkTotals;
    requests: RequestComparisonResult[];
  },
  {
    time: number;
    receivedBytes: number;
    roundTrips: number;
  }
>;

export type SummaryComparisonResult = ComparisonResult<
  {
    network: SummaryNetworkComparisonResult;
    origin: DependencyChainOrigin;
    screenshot: ScaledScreenShot;
  },
  {
    time: number;
  }
>;

export type NetworkComparisonResult = ComparisonResult<
  unknown,
  {
    time: number;
    receivedBytes: number;
    roundTrips: number;
  }
>;

export type PerformanceComparisonResult = ComparisonResult<
  {
    summaries: SummaryComparisonResult[];
    network: NetworkComparisonResult;
  },
  {
    time: number;
  }
>;

export type NetworkTotals = {
  time: number;
  receivedBytes: number;
  roundTrips: number;
};

export function comparePerformanceAnalysisResults(
  current: PerformanceAnalysisResult,
  previousResults: PerformanceAnalysisResult[]
): PerformanceComparisonResult {
  const errors: string[] = [];

  assert(previousResults.length > 0, "No previous results to compare to");

  let currentSummaries = current.summaries;
  const currentSummaryCount = currentSummaries.length;
  let numSummariesToCompare = currentSummaryCount;

  console.log("Performance results: ", { current, previousResults });

  const previousResultSummaryCounts = previousResults.map(result => result.summaries.length);

  // TODO Handling of mismatched number of summaries
  if (!previousResultSummaryCounts.every(previousCount => currentSummaryCount === previousCount)) {
    const min = Math.min(currentSummaryCount, ...previousResultSummaryCounts);
    const max = Math.max(currentSummaryCount, ...previousResultSummaryCounts);
    errors.push(
      `Runs have a different number of summaries. Only first ${min} summaries were compared. Ignoring the last ${max - min} summaries.`
    );

    numSummariesToCompare = min;
    currentSummaries = currentSummaries.slice(0, min);
  }

  const summaryComparisons = currentSummaries.map((currentSummary, i): SummaryComparisonResult => {
    const summaryErrors: string[] = [];
    const networkErrors: string[] = [];

    let currentLimitingNetworkRequests = getLimitingNetworkRequests(currentSummary.dependencySteps);
    const currentRequestsCount = currentLimitingNetworkRequests.length;
    let numRequestsToCompare = currentRequestsCount;

    const currentInteractionNetworkTotals = calculateInteractionNetworkTotals(
      currentSummary,
      currentLimitingNetworkRequests
    );

    const allPreviousNetworkRequestDetails = previousResults.map(result => {
      const previousCorrespondingSummary = result.summaries[i];
      const previousLimitingNetworkRequests = getLimitingNetworkRequests(
        previousCorrespondingSummary.dependencySteps
      );

      const networkTotals = calculateInteractionNetworkTotals(
        previousCorrespondingSummary,
        previousLimitingNetworkRequests
      );
      return {
        summary: previousCorrespondingSummary,
        networkRequests: previousLimitingNetworkRequests,
        networkTotals,
      };
    });

    const maxPreviousNetworkTotals = allPreviousNetworkRequestDetails.reduce(
      (acc, current) => {
        return {
          time: Math.max(acc.time, current.networkTotals.time),
          receivedBytes: Math.max(acc.receivedBytes, current.networkTotals.receivedBytes),
          roundTrips: Math.max(acc.roundTrips, current.networkTotals.roundTrips),
        };
      },
      { time: 0, receivedBytes: 0, roundTrips: 0 } as NetworkTotals
    );

    const previousRequestCounts = allPreviousNetworkRequestDetails.map(
      details => details.networkRequests.length
    );
    if (
      !previousRequestCounts.every(
        previousRequestsCount => currentRequestsCount === previousRequestsCount
      )
    ) {
      const min = Math.min(currentSummaryCount, ...previousResultSummaryCounts);
      const max = Math.max(currentSummaryCount, ...previousResultSummaryCounts);
      summaryErrors.push(
        `Summaries ${i} have a different number of network requests. Only first ${min} requests were compared. Ignoring the last ${max - min} requests.`
      );

      numRequestsToCompare = min;
      currentLimitingNetworkRequests = currentLimitingNetworkRequests.slice(0, min);
    }

    // TODO Handling of mismatched number of requests
    // if (currentLimitingNetworkRequests.length !== previousLimitingNetworkRequests.length) {
    //   const min = Math.min(currentSummaries.length, previousSummaries.length);
    //   const max = Math.max(currentSummaries.length, previousSummaries.length);
    //   summaryErrors.push(
    //     `Summaries ${i} have a different number of network requests. Only first ${min} requests were compared. Ignoring the last ${max - min} requests.`
    //   );
    //   currentLimitingNetworkRequests = currentLimitingNetworkRequests.slice(0, min);
    //   previousLimitingNetworkRequests = previousLimitingNetworkRequests.slice(0, min);
    // }

    const requestComparisons = currentLimitingNetworkRequests.map(
      (currentRequest, j): RequestComparisonResult => {
        const correspondingPreviousRequests = allPreviousNetworkRequestDetails.map(
          details => details.networkRequests[j]
        );

        const maxValues = correspondingPreviousRequests.reduce(
          (acc, current) => {
            return {
              time: Math.max(acc.time, current.time),
              receivedBytes: Math.max(acc.receivedBytes, current.receivedBytes),
            };
          },
          { time: 0, receivedBytes: 0 }
        );

        const previousRequest = correspondingPreviousRequests[j];
        return {
          diffs: {
            time: currentRequest.time - maxValues.time,
            receivedBytes: currentRequest.receivedBytes - maxValues.receivedBytes,
          },
          urls: {
            previous: previousRequest.url,
            current: currentRequest.url,
          },
          errors: [],
        };
      }
    );

    const previousElapsed = allPreviousNetworkRequestDetails.map(
      details => details.summary.elapsed
    );
    const maxPreviousElapsed = Math.max(...previousElapsed);

    console.log(`Summary ${i}: `, {
      current: {
        summary: currentSummary,
        networkRequests: currentLimitingNetworkRequests,
      },
      allPreviousNetworkRequestDetails,
      currentInteractionNetworkTotals,
      currentElapsed: currentSummary.elapsed,
      maxPreviousNetworkTotals,
      maxPreviousElapsed,
    });

    return {
      diffs: {
        time: currentSummary.elapsed - maxPreviousElapsed,
      },
      origin: currentSummary.origin,
      screenshot: currentSummary.commitScreenShot,
      network: {
        maxPreviousNetworkTotals,
        diffs: {
          time: currentSummary.networkTime - maxPreviousNetworkTotals.time,
          // this isn't precomputed in the performance analysis result, it could be added there
          receivedBytes:
            currentInteractionNetworkTotals.receivedBytes - maxPreviousNetworkTotals.receivedBytes,
          roundTrips:
            currentInteractionNetworkTotals.roundTrips - maxPreviousNetworkTotals.roundTrips,
        },
        requests: requestComparisons,
        errors: networkErrors,
      },
      errors: summaryErrors,
    };
  });

  const currentAnalysisNetworkTotals = calculateAnalysisNetworkTotals(current);
  const previousAnalysisNetworkTotals = previousResults.map(result =>
    calculateAnalysisNetworkTotals(result)
  );
  const maxPreviousAnalysisNetworkTotals = previousAnalysisNetworkTotals.reduce(
    (acc, current) => {
      return {
        time: Math.max(acc.time, current.time),
        receivedBytes: Math.max(acc.receivedBytes, current.receivedBytes),
        roundTrips: Math.max(acc.roundTrips, current.roundTrips),
      };
    },
    { time: 0, receivedBytes: 0, roundTrips: 0 } as NetworkTotals
  );

  const currentEndTime = last(current.summaries).endTime;
  const maxEndTimes = previousResults.map(result => last(result.summaries).endTime);
  const maxEndTime = Math.max(...maxEndTimes);

  console.log("End times: ", {
    currentEndTime,
    maxEndTimes,
    maxEndTime,
  });

  console.log("Final network totals: ");
  return {
    diffs: {
      // this truly compares *last* end times, if the number of summaries is different, this will likely be way off
      // it feels like we should compute this value though and not rely on the last summary that is available in both
      time: currentEndTime - maxEndTime,
    },
    summaries: summaryComparisons,
    network: {
      diffs: {
        time: currentAnalysisNetworkTotals.time - maxPreviousAnalysisNetworkTotals.time,
        receivedBytes:
          currentAnalysisNetworkTotals.receivedBytes -
          maxPreviousAnalysisNetworkTotals.receivedBytes,
        roundTrips:
          currentAnalysisNetworkTotals.roundTrips - maxPreviousAnalysisNetworkTotals.roundTrips,
      },
      errors: [],
    },
    errors,
  };
}

function calculateInteractionNetworkTotals(
  summary: OriginSummary,
  requests: NetworkRequestBasicTotals[]
): NetworkTotals {
  return {
    time: summary.networkTime,
    receivedBytes: requests.reduce(addReceivedBytes, 0),
    roundTrips: requests.length,
  };
}

export function calculateAnalysisNetworkTotals(result: PerformanceAnalysisResult): NetworkTotals {
  return {
    time: result.requests.reduce(addTime, 0),
    receivedBytes: result.requests.reduce(addReceivedBytes, 0),
    roundTrips: result.requests.length,
  };
}

function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}
