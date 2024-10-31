import { fetchPerformanceResult } from "../performance/performanceResult";
import { PerformanceAnalysisResult } from "../performance/interfaceTypes";
import { useState, useEffect } from "react";
import { RecordingDisplay } from "./performance/RecordingDisplay";
import { OriginDisplay } from "./performance/OriginDisplay";

interface PerformanceMockupProps {
  recordingId: string;
  result: PerformanceAnalysisResult;
}

export default function PerformanceMockup({ recordingId, result }: PerformanceMockupProps) {
  if (typeof result == "string") {
    return <div className="Status">{result}</div>;
  }

  const { recordingURL } = result;

  return (
    <div className="App">
      <RecordingDisplay recordingURL={recordingURL}></RecordingDisplay>
      {result.summaries.map((summary, index) => {
        const props = { summary };
        return <OriginDisplay key={index} {...props}></OriginDisplay>;
      })}
      <div className="Footer"></div>
    </div>
  );
}

export default PerformanceMockup;
