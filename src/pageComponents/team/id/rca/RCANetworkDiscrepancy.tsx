import { useState } from "react";
import classnames from "classnames";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";

import { useConfirmDialog } from "@/hooks/useConfirmDialog";

import {
  DiscrepancyKind,
  NetworkEventContentsRequest,
  NetworkEventContentsResponseJSON,
  NetworkEventDiscrepancy,
  RCATestEntry,
} from "@/graphql/queries/useGetWorkspaceRootCauseRuns";
import { useCreateRootCauseCategoryDiscrepancy } from "@/graphql/queries/useRootCauseCategoryDiscrepancyMutations";

import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";
import {
  RootCauseDiscrepancyTriplet,
  useWorkspaceRootCauseCategories,
} from "@/graphql/queries/useWorkspaceRootCauseCategories";

function RCANetworkDiscrepancyLine({
  discrepancy,
  children,
  setHoveredDiscrepancy,
  isHovered,
  onAddToCategoryClicked,
}: {
  discrepancy: NetworkEventDiscrepancy;
  children: React.ReactNode;
  setHoveredDiscrepancy: (discrepancy: NetworkEventDiscrepancy | null) => void;
  isHovered: boolean;
  onAddToCategoryClicked: (discrepancy: NetworkEventDiscrepancy) => void;
}) {
  const discrepancyColor = discrepancy.kind === "Missing" ? "bg-red-400" : "bg-green-400";

  let hoverContent: React.ReactNode = null;
  if (isHovered) {
    hoverContent = (
      <div className="absolute right-0">
        <button
          className="bg-sky-600 text-white rounded"
          onClick={() => {
            onAddToCategoryClicked(discrepancy);
          }}
        >
          Add to Category
        </button>
      </div>
    );
  }
  return (
    <div
      className={classnames("flex flex-row relative hover:border-blue-400 hover:border")}
      onMouseOver={() => setHoveredDiscrepancy(discrepancy)}
      onMouseOut={() => setHoveredDiscrepancy(null)}
    >
      <div className={classnames("min-w-16", discrepancyColor)}>{discrepancy.kind}</div>
      <div className="font-mono">{children}</div>
      {hoverContent}
    </div>
  );
}

export function RCANetworkDiscrepancyDisplay({
  analysisTestEntry,
  workspaceId,
  networkDiscrepancies,
}: {
  analysisTestEntry: RCATestEntry;
  workspaceId: string;
  networkDiscrepancies: NetworkEventDiscrepancy[];
}) {
  const [hoveredDiscrepancy, setHoveredDiscrepancy] = useState<NetworkEventDiscrepancy | null>(
    null
  );

  const [discrepancyToAdd, setDiscrepancyToAdd] = useState<NetworkEventDiscrepancy | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { categories } = useWorkspaceRootCauseCategories(workspaceId);
  const { createRootCauseCategoryDiscrepancies } = useCreateRootCauseCategoryDiscrepancy();

  const {
    confirmationDialog: addDiscrepancyToCategoryDialog,
    showConfirmationDialog: showAddDiscrepancyDialog,
  } = useConfirmDialog(
    async (confirmRemove: boolean) => {
      const categoryToAdd = categories.find(category => category.id === selectedCategory);

      if (confirmRemove && discrepancyToAdd && categoryToAdd) {
        const { kind, eventKind, key } = discrepancyToAdd;
        const discrepancy: RootCauseDiscrepancyTriplet = {
          kind,
          eventKind,
          key,
        };

        const result = await createRootCauseCategoryDiscrepancies(workspaceId, categoryToAdd.id, [
          discrepancy,
        ]);
      }
    },
    {
      cancelButtonLabel: "Cancel",
      confirmButtonLabel: "Add to Category",
      message: (
        <div className="flex flex-col">
          <div>
            &apos;{discrepancyToAdd?.kind === DiscrepancyKind.Extra ? "Extra" : "Missing"}&apos;
            discrepancy from request {discrepancyToAdd?.event.data.requestUrl}
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

  const url = networkDiscrepancies[0]?.event.data.requestUrl;

  const discrepanciesByRequestOrResponse = groupBy(networkDiscrepancies, d => d.event.data.kind);

  const requestDiscrepancies = discrepanciesByRequestOrResponse["Request"];
  const responseDiscrepancies = discrepanciesByRequestOrResponse["ResponseJSON"];

  let requestContent: React.ReactNode = null;
  let responseContent: React.ReactNode = null;

  if (requestDiscrepancies) {
    requestContent = (
      <div>
        <h5 className="text-md">Request</h5>
        <div className="flex flex-col gap-1">
          {requestDiscrepancies.map(d => {
            const contents = d.event.data as NetworkEventContentsRequest;
            const key = `${d.kind}:${d.eventKind}:${d.key}`;
            const { requestTag, requestUrl, requestMethod, responseCode } = contents;
            const lineContent = (
              <>
                {requestMethod} {requestUrl} -&gt; {responseCode}{" "}
                {requestTag ? `(${requestTag})` : null}
              </>
            );

            return (
              <RCANetworkDiscrepancyLine
                key={key}
                discrepancy={d}
                setHoveredDiscrepancy={setHoveredDiscrepancy}
                isHovered={d === hoveredDiscrepancy}
                onAddToCategoryClicked={discrepancy => {
                  setDiscrepancyToAdd(discrepancy);
                  showAddDiscrepancyDialog();
                }}
              >
                {lineContent}
              </RCANetworkDiscrepancyLine>
            );
          })}
        </div>
      </div>
    );
  }

  if (responseDiscrepancies) {
    // There could be a _lot_ of entries here because these are based on distinct JSON paths.
    // There's also some duplication as well.
    // We're going to:
    // - Group these by kind
    // - Find the unique set of JSON paths for each group
    // - Filter to one discrepancy per JSON path
    // - Only take the first 10 discrepancies per group

    const discrepanciesByKind = groupBy(responseDiscrepancies, d => d.kind);
    const filteredDiscrepanciesByKind = mapValues(discrepanciesByKind, discrepancies => {
      const seenJsonPaths = new Set<string>();
      const filteredDiscrepancies = discrepancies.filter(d => {
        const contents = d.event.data as NetworkEventContentsResponseJSON;
        const { path } = contents;

        if (!path || seenJsonPaths.has(path)) {
          return false;
        }
        seenJsonPaths.add(path);
        return true;
      });

      return filteredDiscrepancies.slice(0, 10);
    });

    const networkDiscrepanciesToShow = Object.values(filteredDiscrepanciesByKind).flat();

    responseContent = (
      <div>
        <h5 className="text-md">Response</h5>
        <div className="flex flex-col gap-1">
          {networkDiscrepanciesToShow.map(d => {
            const key = `${d.kind}:${d.eventKind}:${d.key}`;
            const contents = d.event.data as NetworkEventContentsResponseJSON;

            return (
              <RCANetworkDiscrepancyLine
                key={key}
                discrepancy={d}
                setHoveredDiscrepancy={setHoveredDiscrepancy}
                isHovered={d === hoveredDiscrepancy}
                onAddToCategoryClicked={discrepancy => {
                  setDiscrepancyToAdd(discrepancy);
                  showAddDiscrepancyDialog();
                }}
              >
                {contents.path}
              </RCANetworkDiscrepancyLine>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <ExpandableSection label={<div className="font-normal font-mono">{url}</div>}>
      <div className="flex flex-col ml-2">
        {requestContent}
        {responseContent}
        {addDiscrepancyToCategoryDialog}
      </div>
    </ExpandableSection>
  );
  return;
}
