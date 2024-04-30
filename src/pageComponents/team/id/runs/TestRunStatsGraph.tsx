import { TestRun } from "@/graphql/types";
import useTooltip from "@/hooks/useTooltip";
import { getTestRunStatsTooltip } from "@/pageComponents/team/id/runs/getTestRunStatsTooltip";
import { getRelativeDate } from "@/utils/date";
import { getBackgroundColorClassName } from "@/utils/test-suites";
import assert from "assert";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";
import { HTMLAttributes } from "react";

export type TestRunStatsData = {
  date: Date;
  numFailedTests: number;
  numFailedTestRuns: number;
  numFlakyTests: number;
  numFlakyTestRuns: number;
  numPassingTests: number;
  numPassingTestRuns: number;
};

export function TestRunStatsGraph({ testRuns }: { testRuns: TestRun[] }) {
  if (testRuns.length === 0) {
    return null;
  }

  let numFailedTestRuns = 0;
  let numFailedTests = 0;
  let numTests = 0;

  const dataByDay: TestRunStatsData[] = [];

  let currentDateIndex = -1;
  let currentData: TestRunStatsData | null = null;

  testRuns.forEach(testRun => {
    const index = differenceInCalendarDays(new Date(), testRun.date);
    if (index !== currentDateIndex) {
      // Account for days in between (e.g. weekend days)
      while (currentDateIndex < index) {
        currentData = {
          date: getRelativeDate({ daysAgo: currentDateIndex + 1 }),
          numFailedTests: 0,
          numFailedTestRuns: 0,
          numFlakyTests: 0,
          numFlakyTestRuns: 0,
          numPassingTests: 0,
          numPassingTestRuns: 0,
        };

        dataByDay.push(currentData);

        currentDateIndex++;
      }
    }

    assert(currentData != null);

    currentData.numFailedTests += testRun.numFailed;
    currentData.numFlakyTests += testRun.numFlaky;
    currentData.numPassingTests += testRun.numPassed;

    // TODO Is this right?
    numFailedTests += testRun.numFailed + testRun.numFlaky;
    numTests += testRun.numFailed + testRun.numFlaky + testRun.numPassed;

    if (testRun.numFailed > 0) {
      // A test run containing a single failing test is a failed test run
      numFailedTestRuns++;
      currentData.numFailedTestRuns++;
    } else if (testRun.numFlaky > 0) {
      currentData.numFlakyTestRuns++;
    } else {
      currentData.numPassingTestRuns++;
    }
  });

  let mostTestsRunsInDay = 0;
  dataByDay.forEach(data => {
    const numTestRuns = data.numFailedTestRuns + data.numFlakyTestRuns + data.numPassingTestRuns;
    if (numTestRuns > mostTestsRunsInDay) {
      mostTestsRunsInDay = numTestRuns;
    }
  });

  dataByDay.reverse();

  const numTestRuns = testRuns.length;
  const testRunFailureRate = numTestRuns > 0 ? numFailedTestRuns / numTestRuns : 0;

  const testFailureRate = numTests > 0 ? numFailedTests / numTests : 0;

  return (
    <div className="flex flex-col items-center gap-2 px-2 pt-2 py-1 bg-slate-900 rounded">
      <div className="inline-flex flex-row gap-2 h-10 overflow-x-auto max-w-full w-auto">
        {dataByDay.map((data, index) => (
          <ChartItem data={data} key={index} mostTestsRunsInDay={mostTestsRunsInDay} />
        ))}
      </div>
      <div className="flex flex-row justify-around gap-2 w-full">
        <Stats
          data-test-id="TestRuns-Stats-RunFailureRateSummary"
          label="run"
          failureCount={numFailedTestRuns}
          failureRate={testRunFailureRate}
          totalCount={numTestRuns}
        />
        <Stats
          data-test-id="TestRuns-Stats-TestFailureRateSummary"
          label="test"
          failureCount={numFailedTests}
          failureRate={testFailureRate}
          totalCount={numTests}
        />
      </div>
    </div>
  );
}

function Stats({
  failureRate,
  failureCount,
  label,
  totalCount,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  failureRate: number;
  failureCount: number;
  label: string;
  totalCount: number;
}) {
  if (totalCount === 0) {
    return null;
  }

  const primaryLabel =
    failureRate === 0
      ? `no failed ${label}s`
      : `${label}s failed: ${Math.round(failureRate * 100)}%`;
  const secondaryLabel =
    failureCount === 0 ? `${totalCount} total` : `${failureCount} of ${totalCount}`;

  return (
    <div {...rest} className="flex flex-row flex-wrap items-center">
      <div className="mr-1 capitalize">{primaryLabel} </div>
      <div className="text-xs text-slate-300">({secondaryLabel})</div>
    </div>
  );
}

function ChartItem({
  data,
  mostTestsRunsInDay,
}: {
  data: TestRunStatsData;
  mostTestsRunsInDay: number;
}) {
  const numTestRuns = data.numFailedTestRuns + data.numFlakyTestRuns + data.numPassingTestRuns;

  let failurePercentage = 0;
  if (numTestRuns > 0 && data.numFailedTestRuns > 0) {
    failurePercentage = data.numFailedTestRuns / numTestRuns;
  }

  const percentageTotal = numTestRuns / mostTestsRunsInDay;

  const tooltipContent = getTestRunStatsTooltip(data);

  const { onMouseEnter, onMouseMove, onMouseLeave, tooltip } = useTooltip({
    tooltip: tooltipContent,
  });

  return (
    <div
      className="relative h-full grow max-w-10 hover:bg-gray-800 transition rounded-sm overflow-hidden w-10 min-w-2"
      data-test-name="TestRuns-Stats-DayColumn"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`flex flex-col justify-end absolute bottom-0 w-full rounded-sm overflow-hidden min-h-1 ${
          numTestRuns > 0 && data.numFailedTestRuns === 0
            ? getBackgroundColorClassName("passed")
            : "bg-gray-700"
        }`}
        style={{
          height: percentageTotal * 100 + "%",
        }}
      >
        {failurePercentage > 0 && (
          <div
            className="bg-rose-500 grow-0 shrink-0 min-h-1"
            style={{ height: failurePercentage * 100 + "%" }}
          />
        )}
      </div>
      {tooltip}
    </div>
  );
}
