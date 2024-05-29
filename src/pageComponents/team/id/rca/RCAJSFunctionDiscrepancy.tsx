import classnames from "classnames";
import { Icon } from "@/components/Icon";
import {
  DiscrepancyKind,
  FormattedFrame,
  LineExecutionDiscrepancy,
  RCATestEntry,
  useWorkspaceRootCauseTestEntryDetails,
} from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";

interface LineDetails {
  line: number;
  source: string;
  discrepancies?: LineExecutionDiscrepancy;
}

export function RCAJSFunctionDiscrepancy({
  analysisTestEntry,
  formattedFrame,
}: {
  formattedFrame: FormattedFrame;
  analysisTestEntry: RCATestEntry;
}) {
  const numLinesWithDiscrepancies = Object.keys(formattedFrame.discrepancies).length;

  const {
    line: functionStartLine,
    sourceLines,
    discrepancies: functionDiscrepancies,
  } = formattedFrame;

  const lineDetails: LineDetails[] = sourceLines.map((source, index) => {
    const line = functionStartLine + index;
    return {
      line,
      source,
      discrepancies: functionDiscrepancies[line],
    };
  });

  return (
    <div
      className={classnames(
        "flex flex-row items-center gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white"
      )}
      data-test-name="RCAJSFunctionDiscrepancy"
    >
      <div className="flex flex-row items-center gap-2 w-full truncate">
        <div className="flex flex-col grow gap-1 truncate">
          <ExpandableSection
            label={
              <>
                <div className="truncate font-bold font-mono">{formattedFrame.functionName}()</div>
                <div className="flex flex-row gap-4 text-sm text-gray-500 whitespace-nowrap">
                  {numLinesWithDiscrepancies} lines with discrepancies
                </div>
              </>
            }
          >
            <div className="flex flex-col font-mono">
              {lineDetails.map(({ line, source, discrepancies }, index) => {
                const hasExtra = !!discrepancies?.[DiscrepancyKind.Extra];
                const hasMissing = !!discrepancies?.[DiscrepancyKind.Missing];
                return (
                  <div className="flex flex-row" key={index}>
                    <div className="min-w-8 text-gray-400">{line}</div>
                    <div
                      className={classnames("min-w-2 text-gray-400", {
                        "bg-green-400": hasExtra,
                      })}
                    >
                      {hasExtra ? "E" : null}
                    </div>
                    <div
                      className={classnames("min-w-2 text-gray-400", {
                        "bg-red-400": hasMissing,
                      })}
                    >
                      {hasMissing ? "M" : null}
                    </div>
                    <div className="flex flex-grow ">
                      <pre className="text-ellipsis">{source}</pre>
                    </div>
                  </div>
                );
              })}
            </div>
          </ExpandableSection>
        </div>
      </div>
    </div>
  );
}
