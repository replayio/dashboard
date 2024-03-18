import { TestSuiteTest } from "@/graphql/types";
import { ExpandableSection } from "@/routes/team/id/runs/ExpandableSection";
import { useMemo } from "react";

interface ErrorCount {
  message: string;
  summary: string;
  count: number;
}

export function TestRunErrors({ test }: { test: TestSuiteTest }) {
  const uniqueErrors = useMemo(() => {
    const errors =
      test.errors?.reduce((acc, e) => {
        const existingError = acc.find((a) => a.message === e);

        if (existingError) {
          existingError.count += 1;
        } else {
          acc.push({ message: e, count: 1, summary: getSummary(e) });
        }

        return acc;
      }, [] as ErrorCount[]) ?? [];
    errors.sort((a, b) => b.count - a.count);

    return errors;
  }, [test]);

  if (uniqueErrors?.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-900 text-white p-2 rounded">
      <ExpandableSection label="Errors">
        <div className="flex flex-col gap-2">
          {uniqueErrors?.map((error, index) => (
            <div
              className="flex flex-col gap-2 bg-rose-950 text-white p-2 rounded shrink-0"
              key={index}
            >
              <div className="flex flex-row gap-2 items-center overflow-hidden">
                <div className="flex items-center justify-center bg-rose-600 text-white w-6 h-6 rounded shrink-0 text-xs">
                  {error.count}
                </div>
                <div className="truncate">{error.summary}</div>
              </div>
              <pre className="whitespace-pre-wrap text-xs overflow-auto break-words">
                {error.message}
              </pre>
            </div>
          ))}
        </div>
      </ExpandableSection>
    </div>
  );
}

function getSummary(message: string) {
  const firstLine = message.split("\n")[0];
  return firstLine?.match(/^.*\dms: (.*)/)?.[1] ?? firstLine ?? "";
}
