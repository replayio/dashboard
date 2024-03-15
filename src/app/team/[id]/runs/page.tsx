import { UpdateDefaultWorkspaceOnMount } from "@/app/team/[id]/UpdateDefaultWorkspaceOnMount";
import { RecordingRow } from "@/app/team/[id]/runs/RecordingRow";
import { TestErrors } from "@/app/team/[id]/runs/TestErrors";
import { TestFilterInput } from "@/app/team/[id]/runs/TestFilterInput";
import { TestRow } from "@/app/team/[id]/runs/TestRow";
import { TestRunRow } from "@/app/team/[id]/runs/TestRunRow";
import { TestRunStats } from "@/app/team/[id]/runs/TestRunStats";
import { TestRunStatsGraph } from "@/app/team/[id]/runs/TestRunStatsGraph";
import { TestRunStatusMenu } from "@/app/team/[id]/runs/TestRunStatusMenu";
import { TestRunBranchMenu } from "@/app/team/[id]/runs/TestRunsBranchMenu";
import { TestRunsDateRangeMenu } from "@/app/team/[id]/runs/TestRunsDateRangeMenu";
import { TestRunsFilterInput } from "@/app/team/[id]/runs/TestRunsFilterInput";
import { TestStatusMenu } from "@/app/team/[id]/runs/TestStatusMenu";
import { getTestSuiteTestRuns } from "@/graphql/queries/getTestSuiteTestRuns";
import { getTestSuiteTests } from "@/graphql/queries/getTestSuiteTests";
import { TestSuiteTest, TestSuiteTestStatus } from "@/graphql/types";
import { getRelativeDate } from "@/utils/date";
import {
  filterTest,
  filterTestRun,
  getColorClassName,
} from "@/utils/test-suites";

export const revalidate = 0;

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    testFilter?: string;
    testId?: string;
    testRunBranch?: string;
    testRunFilter?: string;
    testRunId?: string;
    testRunStatus?: string;
    testStatus?: string;
  };
}) {
  const workspaceId = decodeURIComponent(params.id);

  const testFilter = searchParams.testFilter ?? "";
  const testId = searchParams.testId ?? null;
  const testRunBranch = searchParams.testRunBranch ?? "";
  const testRunFilter = searchParams.testRunFilter ?? "";
  const testRunId = searchParams.testRunId ?? null;
  const testRunStatus = searchParams.testRunStatus ?? "";
  const testStatus = searchParams.testStatus ?? "";

  const testRuns = await getTestSuiteTestRuns(workspaceId);
  const tests = testRunId
    ? await getTestSuiteTests(workspaceId, testRunId)
    : null;

  const filteredTestRuns = testRuns.filter((testRun) =>
    filterTestRun(testRun, {
      afterDate: getRelativeDate({ daysAgo: 6 }),
      branch: testRunBranch,
      status: testRunStatus,
      text: testRunFilter,
    })
  );

  let durationMs = 0;
  tests?.forEach((test) => {
    durationMs += test.durationMs;
  });

  const filteredTests = tests
    ? tests
        .filter((test) =>
          filterTest(test, {
            status: testStatus,
            text: testFilter,
          })
        )
        .sort((a, b) => a.title.localeCompare(b.title))
    : null;

  const selectedTestRun = filteredTestRuns.find(
    (testRun) => testRun.id === testRunId
  );

  const selectedTest = filteredTests?.find((test) => test.id === testId);

  // TODO Organize by file path
  const categorizedTests = {
    failed: {
      color: getColorClassName("failed"),
      count: selectedTestRun?.numFailed ?? 0,
      label: "Failed",
      tests: [] as TestSuiteTest[],
    },
    flaky: {
      color: getColorClassName("flaky"),
      count: selectedTestRun?.numFlaky ?? 0,
      label: "Flaky",
      tests: [] as TestSuiteTest[],
    },
    passed: {
      color: getColorClassName("passed"),
      count: selectedTestRun?.numPassed ?? 0,
      label: "Passed",
      tests: [] as TestSuiteTest[],
    },
  };

  filteredTests?.forEach((test) => {
    switch (test.status) {
      case "failed": {
        categorizedTests.failed.tests.push(test);
        break;
      }
      case "flaky": {
        categorizedTests.flaky.tests.push(test);
        break;
      }
      case "passed": {
        categorizedTests.passed.tests.push(test);
      }
    }
  });

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2 h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="basis-4/12 shrink overflow-auto">
              <TestRunStatusMenu />
            </div>
            <div className="basis-4/12 shrink overflow-auto">
              <TestRunsDateRangeMenu />
            </div>
            <div className="basis-4/12 shrink overflow-auto">
              <TestRunBranchMenu />
            </div>
          </div>
          <TestRunsFilterInput />
        </div>
        <TestRunStatsGraph testRuns={filteredTestRuns} />
        <div className="overflow-y-auto -mx-1">
          {filteredTestRuns.map((testRun) => (
            <TestRunRow
              currentTestRunId={testRunId}
              key={testRun.id}
              testRun={testRun}
            />
          ))}
        </div>
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        {selectedTestRun ? (
          <>
            <div className="flex flex-col gap-2">
              <TestStatusMenu />
              <TestFilterInput key={testRunId} />
            </div>
            <TestRunStats durationMs={durationMs} testRun={selectedTestRun} />
            <div className="overflow-auto -mx-1">
              {Object.values(categorizedTests).map(
                ({ color, count, label, tests }) =>
                  count > 0 ? (
                    <>
                      <div className={`font-bold mx-1 ${color}`}>
                        {count === 1
                          ? `1 ${label} test`
                          : `${count} ${label} tests`}
                      </div>
                      {tests.map((test, index) => (
                        <TestRow
                          currentTestId={testId}
                          key={index}
                          test={test}
                        />
                      ))}
                    </>
                  ) : null
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a run to see its details here
          </div>
        )}
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12 overflow-auto flex flex-col gap-2">
        {selectedTest ? (
          <>
            <div className="shrink-0 -mx-1">
              <div className="font-bold mb-2">Replays</div>
              {selectedTest.recordings.map((recording, index) => {
                let status: TestSuiteTestStatus;
                switch (selectedTest.status) {
                  case "failed": {
                    status = "failed";
                    break;
                  }
                  case "flaky": {
                    status =
                      index === selectedTest.recordings.length - 1
                        ? "passed"
                        : "flaky";
                    break;
                  }
                  case "passed": {
                    status = "passed";
                    break;
                  }
                }

                return (
                  <RecordingRow
                    key={recording.id}
                    recording={recording}
                    status={status}
                  />
                );
              })}
            </div>
            <TestErrors test={selectedTest} />
          </>
        ) : selectedTestRun ? (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a test to see its details here
          </div>
        ) : null}
      </div>
      <UpdateDefaultWorkspaceOnMount workspaceId={workspaceId} />
    </div>
  );
}
