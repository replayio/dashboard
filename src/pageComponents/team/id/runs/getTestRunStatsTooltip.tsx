import { TestRunStatsData } from "@/pageComponents/team/id/runs/TestRunStatsGraph";
import { ReactNode } from "react";

export function getTestRunStatsTooltip(chartData: TestRunStatsData): ReactNode {
  const {
    date,
    numFailedTestRuns,
    numPassingTestRuns,
    numFailedTests,
    numPassingTests,
  } = chartData;

  const numRunsTotal = numFailedTestRuns + numPassingTestRuns;

  let testRunLabel = null;
  let testLabel = null;
  if (numRunsTotal === 0) {
    testRunLabel = "No tests were run on this day";
  } else {
    const numRunsTotal = numFailedTestRuns + numPassingTestRuns;

    if (numFailedTestRuns === 0) {
      if (numRunsTotal === 1) {
        testRunLabel = (
          <div>
            <strong>1</strong> test run passed
          </div>
        );
      } else {
        testRunLabel = (
          <div>
            All <strong>{numRunsTotal.toLocaleString()}</strong> test runs
            passed
          </div>
        );
      }
    } else if (numPassingTestRuns === 0) {
      if (numRunsTotal === 1) {
        testRunLabel = (
          <div>
            <strong>1</strong> test run failed
          </div>
        );
      } else {
        testRunLabel = (
          <div>
            All <strong>{numRunsTotal.toLocaleString()}</strong> test runs
            contained at least one failing test
          </div>
        );
      }
    } else {
      const percentage =
        numRunsTotal === 0
          ? 0
          : Math.round((numFailedTestRuns / numRunsTotal) * 100);

      testRunLabel = (
        <div>
          <strong>{percentage}%</strong> of{" "}
          <strong>{numRunsTotal.toLocaleString()}</strong> test runs contained
          at least one failing test
        </div>
      );
    }

    const numTestsTotal = numFailedTests + numPassingTests;
    if (numTestsTotal === 0) {
      // Redundant with no test runs
    } else if (numFailedTests === 0) {
      testLabel = (
        <div>
          All <strong>{numTestsTotal.toLocaleString()}</strong> tests passed
        </div>
      );
    } else if (numPassingTests === 0) {
      testLabel = (
        <div>
          All <strong>{numTestsTotal.toLocaleString()}</strong> tests failed
        </div>
      );
    } else {
      testLabel = (
        <div>
          <strong>{numFailedTests.toLocaleString()}</strong> tests failed out of{" "}
          <strong>{numTestsTotal.toLocaleString()}</strong> total tests
        </div>
      );
    }
  }

  return (
    <div
      className="text-sm flex flex-col gap-2"
      data-test-name="TestRuns-Stats-DayColumn-Tooltip"
    >
      <div className="font-bold text-base">
        {date.toLocaleString("default", { month: "short" })} {date.getDate()}
      </div>
      {testRunLabel}
      {testLabel}
    </div>
  );
}
