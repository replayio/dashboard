import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RequestComparisonResult } from "@/performance/compare";
import { DiffBadge } from "./DiffBadge";

type RCProps = {
  request: RequestComparisonResult;
};

export const RequestComparison = ({ request }: RCProps) => (
  <TableRow>
    <TableCell>{request.urls.current}</TableCell>
    <TableCell>
      <DiffBadge value={request.diffs.time} unit="ms" />
    </TableCell>
    <TableCell>
      <DiffBadge value={request.diffs.receivedBytes} unit="bytes" />
    </TableCell>
  </TableRow>
);
