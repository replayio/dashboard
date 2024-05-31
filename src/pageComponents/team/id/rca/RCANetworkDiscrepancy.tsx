import { useMemo, useState } from "react";
import classnames from "classnames";
import groupBy from "lodash/groupBy";

import { Icon } from "@/components/Icon";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

import {
  AnyDiscrepancy,
  DiscrepancyKind,
  ExecutedStatementDiscrepancy,
  FormattedFrame,
  LineExecutionDiscrepancy,
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

  return <div className="font-mono">URL: {url}</div>;
}
