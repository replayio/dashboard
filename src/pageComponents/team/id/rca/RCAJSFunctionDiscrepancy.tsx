import classnames from "classnames";
import { Icon } from "@/components/Icon";
import {
  AnyDiscrepancy,
  DiscrepancyKind,
  ExecutedStatementDiscrepancy,
  FormattedFrame,
  LineExecutionDiscrepancy,
  RCATestEntry,
  isExecutedStatementDiscrepancy,
  useWorkspaceRootCauseTestEntryDetails,
} from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";
import { useCreateRootCauseCategoryDiscrepancy } from "@/graphql/queries/useRootCauseCategoryDiscrepancyMutations";
import { useState } from "react";
import {
  RootCauseDiscrepancyTriplet,
  useWorkspaceRootCauseCategories,
} from "@/graphql/queries/useWorkspaceRootCauseCategories";

interface LineDetails {
  line: number;
  source: string;
  discrepancies?: LineExecutionDiscrepancy;
}

export function RCAJSFunctionDiscrepancy({
  analysisTestEntry,
  formattedFrame,
  workspaceId,
  discrepanciesByKindAndPoint,
}: {
  formattedFrame: FormattedFrame;
  analysisTestEntry: RCATestEntry;
  workspaceId: string;
  discrepanciesByKindAndPoint: Record<string, Record<string, ExecutedStatementDiscrepancy>>;
}) {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { categories } = useWorkspaceRootCauseCategories(workspaceId);
  const { createRootCauseCategoryDiscrepancies } = useCreateRootCauseCategoryDiscrepancy();

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

                const isHovered = hoveredLine === line;
                const hasDiscrepancy = hasExtra || hasMissing;

                let hoverContent: React.ReactNode = null;

                if (isHovered) {
                  if (hasDiscrepancy) {
                    hoverContent = (
                      <div className="absolute right-0">
                        <select
                          value={selectedCategory || ""}
                          onChange={e => setSelectedCategory(e.target.value)}
                        >
                          <option value="">Select category</option>
                          {categories.map(category => {
                            return (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            );
                          })}
                        </select>
                        <button
                          className="bg-sky-600 text-white rounded"
                          onClick={async () => {
                            const categoryToAdd = categories.find(
                              category => category.id === selectedCategory
                            );

                            console.log("Category: ", categoryToAdd);
                            if (categoryToAdd) {
                              const searchKind = hasExtra
                                ? DiscrepancyKind.Extra
                                : DiscrepancyKind.Missing;
                              const searchPoint = discrepancies[searchKind];
                              console.log("Search values: ", {
                                sourceId: formattedFrame.sourceId,
                                line,
                                searchPoint,
                              });
                              const actualDiscrepancy = analysisTestEntry.discrepancies.find(d => {
                                if (isExecutedStatementDiscrepancy(d)) {
                                  const { event } = d;
                                  const pointMatches = d.event.point === searchPoint;

                                  return pointMatches;
                                  // const matchingLocation = event.location.find(
                                  //   l => l.sourceId == formattedFrame.sourceId && l.line == line
                                  // );
                                  // if (matchingLocation) {
                                  //   console.log("Found matching location: ", matchingLocation, d);
                                  //   return true;
                                  // }
                                }

                                return false;
                              });

                              console.log("Actual discrepancy: ", actualDiscrepancy);

                              if (actualDiscrepancy) {
                                const { kind, eventKind, key } = actualDiscrepancy;
                                const discrepancy: RootCauseDiscrepancyTriplet = {
                                  kind,
                                  eventKind,
                                  key,
                                };

                                console.log("Creating discrepancy: ", {
                                  categoryId: categoryToAdd.id,
                                  discrepancy,
                                });

                                const result = await createRootCauseCategoryDiscrepancies(
                                  workspaceId,
                                  categoryToAdd.id,
                                  [discrepancy]
                                );
                                console.log("Creation result: ", result);
                              }
                            }
                          }}
                        >
                          Add to Category
                        </button>
                      </div>
                    );
                  }
                }
                return (
                  <div
                    className={classnames("flex flex-row relative", {
                      "hover:border-blue-400 hover:border": hasExtra || hasMissing,
                    })}
                    key={index}
                    onMouseOver={() => setHoveredLine(line)}
                    onMouseOut={() => setHoveredLine(null)}
                  >
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
                    {hoverContent}
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
