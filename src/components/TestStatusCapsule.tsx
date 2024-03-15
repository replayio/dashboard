import { TestSuiteTestStatus } from "@/graphql/types";
import { getBackgroundColorClassName } from "@/utils/test-suites";

export function TestStatusCapsule({
  className = "",
  count,
  status,
}: {
  className?: string;
  count: number;
  status: TestSuiteTestStatus;
}) {
  if (count == 0) {
    return null;
  }

  return (
    <div
      className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-md text-xs ${getBackgroundColorClassName(
        status
      )} ${className}`}
    >
      {count}
    </div>
  );
}
