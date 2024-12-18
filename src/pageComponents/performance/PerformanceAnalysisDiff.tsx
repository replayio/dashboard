import React from "react";

import { PerformanceAnalysisResult } from "@/performance/interfaceTypes";
import { comparePerformanceAnalysisResults, SummaryComparisonResult } from "@/performance/compare";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

import { DiffBadge, DeviationHighlightBadge } from "./DiffBadge";
import { RequestComparison } from "./RequestComparison";

import { ExpandableScreenShot } from "@/components/performance/ExpandableScreenShot";

const RecordingLink = ({ recordingId }: { recordingId: string }) => {
  return (
    <a href={`/recording/${recordingId}`} className="text-blue-500 underline">
      {recordingId}
    </a>
  );
};

interface SummaryComparisonProps {
  summary: SummaryComparisonResult;
}

const SummaryComparison = ({ summary }: SummaryComparisonProps) => {
  const { origin } = summary;
  let title: React.ReactNode = <>Summary</>;

  if (origin.kind === "documentLoad") {
    title = "Document Load";
  } else if ((origin.kind = "dispatchEvent")) {
    title = <>Event: {origin.eventType ?? "unknown"}</>;
  } else if (origin.kind === "resize") {
    title = "Resize";
  } else {
    title = "Other";
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          <div>
            Total time diff: <DiffBadge value={summary.diffs.time} unit="ms" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">Screenshot</h4>
        <ExpandableScreenShot scaledScreenShot={summary.screenshot} title="" />
        <h4 className="font-semibold mb-2">Network</h4>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            Time: <DeviationHighlightBadge value={summary.network.diffs.time} unit="ms" />
          </div>
          <div>
            Received bytes:{" "}
            <DeviationHighlightBadge value={summary.network.diffs.receivedBytes} unit="bytes" />
          </div>
          <div>
            Round trips:{" "}
            <DeviationHighlightBadge
              value={summary.network.diffs.roundTrips}
              unit=""
              reverseColors={true}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Time Diff</TableHead>
              <TableHead>Size Diff</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary.network.requests.map((request, i) => (
              <RequestComparison request={request} key={i} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

interface PerformanceDiffPageProps {
  current: PerformanceAnalysisResult;
  previous: PerformanceAnalysisResult[];
}

const PerformanceDiffPage: React.FC<PerformanceDiffPageProps> = ({ current, previous }) => {
  const comparisonResult = comparePerformanceAnalysisResults(current, previous);

  console.log("Comparison result: ", comparisonResult);

  const branch = current.spec?.metadata?.branch;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Performance Analysis Diff</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Recording</CardTitle>
            <CardDescription>
              <RecordingLink recordingId={current.spec.recordingId} />{" "}
              {branch ? `(branch: ${branch})` : null}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Previous Recordings</CardTitle>
            <CardDescription>
              {previous.map(p => {
                const { recordingId } = p.spec;
                return (
                  <div key={recordingId}>
                    <RecordingLink recordingId={recordingId} />
                  </div>
                );
              })}
            </CardDescription>
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
              <DiffBadge value={comparisonResult.diffs.time} unit="ms" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Network</h4>
              <div>
                Time: <DiffBadge value={comparisonResult.network.diffs.time} unit="ms" />
              </div>
              <div>
                Received bytes:{" "}
                <DiffBadge value={comparisonResult.network.diffs.receivedBytes} unit="bytes" />
              </div>
              <div>
                Round trips:{" "}
                <DiffBadge
                  value={comparisonResult.network.diffs.roundTrips}
                  unit=""
                  reverseColors={true}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summaries">
        <TabsList>
          <TabsTrigger value="summaries">Interactions</TabsTrigger>
          <TabsTrigger value="network">Network Details</TabsTrigger>
        </TabsList>
        <TabsContent value="summaries">
          <ScrollArea className="h-[600px] pr-4">
            {comparisonResult.summaries.map((summary, i) => (
              <SummaryComparison summary={summary} key={i} />
            ))}
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
                      summary.network.requests.map((request, i) => (
                        <RequestComparison request={request} key={i} />
                      ))
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
