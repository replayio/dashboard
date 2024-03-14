import { TestSuiteTest } from "@/graphql/types";
import { useMemo } from "react";

interface ErrorCount {
  message: string;
  summary: string;
  count: number;
}

export function TestErrors({ test }: { test: TestSuiteTest }) {
  const sortedErrors = useMemo(() => {
    const errors = test.errors ?? [];
    const uniqueErrors = errors.reduce((acc, e) => {
      const existingError = acc.find((a) => a.message === e);

      if (existingError) {
        existingError.count += 1;
      } else {
        acc.push({ message: e, count: 1, summary: getSummary(e) });
      }

      return acc;
    }, [] as ErrorCount[]);

    return uniqueErrors.sort((a, b) => b.count - a.count);
  }, [test]);

  if (sortedErrors?.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="font-bold mb-2">Errors</div>
      {sortedErrors?.map((error, index) => (
        <div
          className="flex flex-col gap-2 bg-red-950 text-white p-2 rounded overflow-hidden"
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
  );
}

function getSummary(message: string) {
  const firstLine = message.split("\n")[0];
  return firstLine?.match(/^.*\dms: (.*)/)?.[1] ?? firstLine ?? "";
}
