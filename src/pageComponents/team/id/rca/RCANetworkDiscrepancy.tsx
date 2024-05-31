import { useMemo, useState } from "react";
import classnames from "classnames";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";

import { Icon } from "@/components/Icon";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

import {
  AnyDiscrepancy,
  DiscrepancyKind,
  ExecutedStatementDiscrepancy,
  FormattedFrame,
  LineExecutionDiscrepancy,
  NetworkEventContentsRequest,
  NetworkEventContentsResponseJSON,
  NetworkEventDiscrepancy,
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

export function RCANetworkDiscrepancyDisplay({
  analysisTestEntry,
  workspaceId,
  networkDiscrepancies,
}: {
  analysisTestEntry: RCATestEntry;
  workspaceId: string;
  networkDiscrepancies: NetworkEventDiscrepancy[];
}) {
  const url = networkDiscrepancies[0]?.event.data.requestUrl;

  const discrepanciesByRequestOrResponse = groupBy(networkDiscrepancies, d => d.event.data.kind);
  console.log("discrepanciesByRequestOrResponse", discrepanciesByRequestOrResponse);

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
            const discrepancyColor = d.kind === "Missing" ? "bg-red-400" : "bg-green-400";
            return (
              <div key={key} className="flex flex-row">
                <div className={classnames("min-w-16", discrepancyColor)}>{d.kind}</div>
                <div className="font-mono">
                  {requestMethod} {requestUrl} -&gt; {responseCode}{" "}
                  {requestTag ? `(${requestTag})` : null}
                </div>
              </div>
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
            const discrepancyColor = d.kind === "Missing" ? "bg-red-400" : "bg-green-400";
            const contents = d.event.data as NetworkEventContentsResponseJSON;

            return (
              <div key={key} className="flex flex-row">
                <div className={classnames("min-w-16", discrepancyColor)}>{d.kind}</div>
                <div className="font-mono">{contents.path}</div>
              </div>
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
      </div>
    </ExpandableSection>
  );
  return;
}
