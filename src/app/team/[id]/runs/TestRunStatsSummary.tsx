import { TestStatusCapsule } from "@/components/TestStatusCapsule";
import { TestRun } from "@/graphql/types";

export function TestRunStatsSummary({ testRun }: { testRun: TestRun }) {
  return (
    <>
      <TestStatusCapsule count={testRun.numFailed} status="failed" />
      <TestStatusCapsule count={testRun.numFlaky} status="flaky" />
      <TestStatusCapsule count={testRun.numPassed} status="passed" />
    </>
  );
}
