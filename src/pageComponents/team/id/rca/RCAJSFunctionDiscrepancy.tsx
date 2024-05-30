import { useMemo, useState } from "react";
import classnames from "classnames";

import { Icon } from "@/components/Icon";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

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
import { useCreateRootCauseCategoryDiscrepancy } from "@/graphql/queries/useRootCauseCategoryDiscrepancyMutations";

import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";
import {
  RCACategory,
  RootCauseDiscrepancyTriplet,
  useWorkspaceRootCauseCategories,
} from "@/graphql/queries/useWorkspaceRootCauseCategories";

interface LineDetails {
  line: number;
  source: string;
  discrepancies?: LineExecutionDiscrepancy;
}

interface DiscrepancyToAddDescription {
  line: number;
  kind: DiscrepancyKind;
  hasExtra: boolean;
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
  const [discrepancyToAdd, setDiscrepancyToAdd] = useState<DiscrepancyToAddDescription | null>(
    null
  );

  const { categories } = useWorkspaceRootCauseCategories(workspaceId);
  const { createRootCauseCategoryDiscrepancies } = useCreateRootCauseCategoryDiscrepancy();

  const {
    confirmationDialog: addDiscrepancyToCategoryDialog,
    showConfirmationDialog: showAddDiscrepancyDialog,
  } = useConfirmDialog(
    async (confirmRemove: boolean) => {
      if (confirmRemove && discrepancyToAdd) {
        await addDiscrepancyToCategory(
          formattedFrame.discrepancies[discrepancyToAdd.line],
          discrepancyToAdd
        );
      }
    },
    {
      cancelButtonLabel: "Cancel",
      confirmButtonLabel: "Add to Category",
      message: (
        <div className="flex flex-col">
          <div>
            &apos;{discrepancyToAdd?.kind === DiscrepancyKind.Extra ? "Extra" : "Missing"}&apos;
            discrepancy on line {discrepancyToAdd?.line}
          </div>
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
        </div>
      ),
      title: "Add Discrepancy to Category",
    }
  );

  const numLinesWithDiscrepancies = Object.keys(formattedFrame.discrepancies).length;

  const {
    line: functionStartLine,
    sourceLines,
    discrepancies: functionDiscrepancies,
  } = formattedFrame;

  const lineDetails: LineDetails[] = useMemo(() => {
    return sourceLines.map((source, index) => {
      const line = functionStartLine + index;
      return {
        line,
        source,
        discrepancies: functionDiscrepancies[line],
      };
    });
  }, [sourceLines, functionDiscrepancies, functionStartLine]);

  const addDiscrepancyToCategory = async (
    discrepanciesForLine: LineExecutionDiscrepancy | undefined,
    description: DiscrepancyToAddDescription
  ) => {
    const categoryToAdd = categories.find(category => category.id === selectedCategory);

    console.log("Category: ", categoryToAdd);
    if (categoryToAdd) {
      const searchKind = description.hasExtra ? DiscrepancyKind.Extra : DiscrepancyKind.Missing;

      const discrepanciesForKindByPoint = discrepanciesByKindAndPoint[searchKind];
      const discrepancyPoint = discrepanciesForLine?.[searchKind];

      const actualDiscrepancy = discrepanciesForKindByPoint?.[discrepancyPoint ?? ""];

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

        const result = await createRootCauseCategoryDiscrepancies(workspaceId, categoryToAdd.id, [
          discrepancy,
        ]);
        console.log("Creation result: ", result);
      }
    }
  };

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
                <div className="truncate font-bold font-mono">
                  {formattedFrame.functionName}() on line {formattedFrame.line}
                </div>
                <div className="flex flex-row gap-4 text-sm text-gray-500 whitespace-nowrap">
                  {numLinesWithDiscrepancies} lines with discrepancies
                </div>
              </>
            }
          >
            <div className="flex flex-col font-mono">
              {lineDetails.map(({ line, source, discrepancies: discrepanciesForLine }, index) => {
                return (
                  <JSFunctionSourceLine
                    key={index}
                    line={line}
                    source={source}
                    discrepanciesForLine={discrepanciesForLine}
                    hoveredLine={hoveredLine}
                    setHoveredLine={setHoveredLine}
                    onAddToCategoryClicked={description => {
                      console.log("Adding to category: ", description);
                      setDiscrepancyToAdd(description);
                      showAddDiscrepancyDialog();
                    }}
                  />
                );
              })}
              {addDiscrepancyToCategoryDialog}
            </div>
          </ExpandableSection>
        </div>
      </div>
    </div>
  );
}

function JSFunctionSourceLine({
  discrepanciesForLine,
  hoveredLine,
  line,
  setHoveredLine,
  source,
  onAddToCategoryClicked,
}: {
  line: number;
  source: string;
  discrepanciesForLine: LineExecutionDiscrepancy | undefined;
  hoveredLine: number | null;
  setHoveredLine: (line: number | null) => void;
  onAddToCategoryClicked: (description: DiscrepancyToAddDescription) => void;
}) {
  const hasExtra = !!discrepanciesForLine?.[DiscrepancyKind.Extra];
  const hasMissing = !!discrepanciesForLine?.[DiscrepancyKind.Missing];

  const isHovered = hoveredLine === line;
  const hasDiscrepancy = hasExtra || hasMissing;

  let hoverContent: React.ReactNode = null;

  if (isHovered) {
    if (hasDiscrepancy) {
      hoverContent = (
        <div className="absolute right-0">
          <button
            className="bg-sky-600 text-white rounded"
            onClick={() => {
              onAddToCategoryClicked({ line, kind: DiscrepancyKind.Extra, hasExtra });
            }}
          >
            Add to Category
          </button>
        </div>
      );
    }
  }

  // Show 4 columns:
  // 1. Line number
  // 2. Extra discrepancy
  // 3. Missing discrepancy
  // 4. Source code
  // Additionally, show a commands bar on hover if the line has discrepancies,
  // absolutely positioned on the right
  return (
    <div
      className={classnames("flex flex-row relative", {
        "hover:border-blue-400 hover:border": hasExtra || hasMissing,
      })}
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
}
