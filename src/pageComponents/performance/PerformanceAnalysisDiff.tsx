import React from "react";
import { PerformanceAnalysisResult } from "@/performance/interfaceTypes";
import {
  compare,
  PerformanceComparisonResult,
  RequestComparisonResult,
  SummaryComparisonResult,
} from "@/performance/compare";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface PerformanceDiffPageProps {
  current: PerformanceAnalysisResult;
  previous: PerformanceAnalysisResult;
}

const PerformanceDiffPage: React.FC<PerformanceDiffPageProps> = ({ current, previous }) => {
  const comparisonResult = compare(current, previous);

  const renderDiffBadge = (value: number, unit: string, reverseColors: boolean = false) => (
    <Badge
      variant={
        value > 0
          ? reverseColors
            ? "default"
            : "secondary"
          : reverseColors
            ? "secondary"
            : "default"
      }
    >
      {value > 0 ? "+" : ""}
      {value.toFixed(2)} {unit}
    </Badge>
  );

  const renderRequestComparison = (request: RequestComparisonResult, index: number) => (
    <TableRow key={index}>
      <TableCell>{request.urls.current}</TableCell>
      <TableCell>{renderDiffBadge(request.diffs.time, "ms")}</TableCell>
      <TableCell>{renderDiffBadge(request.diffs.receivedBytes, "bytes")}</TableCell>
    </TableRow>
  );

  const renderSummaryComparison = (summary: SummaryComparisonResult, index: number) => (
    <Card key={index} className="mb-4">
      <CardHeader>
        <CardTitle>Summary {index + 1}</CardTitle>
        <CardDescription>
          Total time diff: {renderDiffBadge(summary.diffs.time, "ms")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">Network</h4>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>Time: {renderDiffBadge(summary.network.diffs.time, "ms")}</div>
          <div>Received bytes: {renderDiffBadge(summary.network.diffs.receivedBytes, "bytes")}</div>
          <div>Round trips: {renderDiffBadge(summary.network.diffs.roundTrips, "", true)}</div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Time Diff</TableHead>
              <TableHead>Size Diff</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{summary.network.requests.map(renderRequestComparison)}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Performance Analysis Diff</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Recording</CardTitle>
            <CardDescription>{current.spec.recordingId}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Previous Recording</CardTitle>
            <CardDescription>{previous.spec.recordingId}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {comparisonResult.errors.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Errors</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside">
              {comparisonResult.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Overall Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Total Time Difference</h4>
              {renderDiffBadge(comparisonResult.diffs.time, "ms")}
            </div>
            <div>
              <h4 className="font-semibold mb-2">Network</h4>
              <div>Time: {renderDiffBadge(comparisonResult.network.diffs.time, "ms")}</div>
              <div>
                Received bytes:{" "}
                {renderDiffBadge(comparisonResult.network.diffs.receivedBytes, "bytes")}
              </div>
              <div>
                Round trips: {renderDiffBadge(comparisonResult.network.diffs.roundTrips, "", true)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summaries">
        <TabsList>
          <TabsTrigger value="summaries">Summaries</TabsTrigger>
          <TabsTrigger value="network">Network Details</TabsTrigger>
        </TabsList>
        <TabsContent value="summaries">
          <ScrollArea className="h-[600px] pr-4">
            {comparisonResult.summaries.map(renderSummaryComparison)}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>Network Request Differences</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Time Diff</TableHead>
                      <TableHead>Size Diff</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonResult.summaries.flatMap(summary =>
                      summary.network.requests.map(renderRequestComparison)
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceDiffPage;
