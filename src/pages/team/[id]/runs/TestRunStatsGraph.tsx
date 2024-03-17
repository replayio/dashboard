import { getTestRunStatsTooltip } from "@/pages/team/[id]/runs/getTestRunStatsTooltip";
import { TestRun } from "@/graphql/types";
import useTooltip from "@/hooks/useTooltip";
import { getNumDaysAgo } from "@/utils/date";
import assert from "assert";

export type TestRunStatsData = {
  date: Date;
  numFailedTests: number;
  numFailedTestRuns: number;
  numPassingTests: number;
  numPassingTestRuns: number;
};

export function TestRunStatsGraph({ testRuns }: { testRuns: TestRun[] }) {
  if (testRuns.length === 0) {
    return null;
  }

  let numFailedTestRuns = 0;

  const dataByDay: TestRunStatsData[] = [];

  let currentDateIndex = -1;
  let currentData: TestRunStatsData | null = null;

  testRuns.forEach((testRun) => {
    const index = getNumDaysAgo(testRun.date);
    if (index !== currentDateIndex) {
      // Account for days in between (e.g. weekend days)
      while (currentDateIndex < index) {
        currentData = {
          date: testRun.date,
          numFailedTests: 0,
          numFailedTestRuns: 0,
          numPassingTests: 0,
          numPassingTestRuns: 0,
        };

        dataByDay.push(currentData);

        currentDateIndex++;
      }
    }

    assert(currentData != null);

    currentData.numFailedTests += testRun.numFailed;
    currentData.numPassingTests += testRun.numPassed;

    if (testRun.numFailed > 0) {
      // A test run containing a single failing test is a failed test run
      numFailedTestRuns++;
      currentData.numFailedTestRuns++;
    } else {
      currentData.numPassingTestRuns++;
    }
  });

  let mostTestsRunsInDay = 0;
  dataByDay.forEach((data) => {
    const numTestRuns = data.numFailedTestRuns + data.numPassingTestRuns;
    if (numTestRuns > mostTestsRunsInDay) {
      mostTestsRunsInDay = numTestRuns;
    }
  });

  dataByDay.reverse();

  const testRunFailureRate =
    testRuns.length > 0 ? numFailedTestRuns / testRuns.length : 0;

  return (
    <div className="flex flex-col gap-2 px-2 pt-2 py-1 bg-slate-900 rounded">
      <div className="flex flex-row justify-items-stretch gap-2 h-10">
        {dataByDay.map((data, index) => (
          <ChartItem
            data={data}
            key={index}
            mostTestsRunsInDay={mostTestsRunsInDay}
          />
        ))}
      </div>
      Failure rate: {Math.round(testRunFailureRate * 100)}%
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
  const numTestRuns = data.numFailedTestRuns + data.numPassingTestRuns;
  const failurePercentage =
    numTestRuns === 0 ? 0 : data.numFailedTestRuns / numTestRuns;
  const percentageTotal = Math.max(0.1, numTestRuns / mostTestsRunsInDay);

  const tooltipContent = getTestRunStatsTooltip(data);

  const { onMouseEnter, onMouseMove, onMouseLeave, tooltip } = useTooltip({
    tooltip: tooltipContent,
  });

  return (
    <div
      className="relative h-full grow hover:bg-gray-800 transition"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="flex flex-col justify-end absolute bottom-0 w-full rounded-tr-sm overflow-hidden bg-gray-700"
        style={{ height: percentageTotal * 100 + "%" }}
      >
        <div
          className="bg-rose-500 grow-0 shrink-0"
          style={{ height: failurePercentage * 100 + "%" }}
        />
      </div>
      {tooltip}
    </div>
  );
}
