import { fetchResult } from "../performance/performanceResult";
import { PerformanceAnalysisResult } from "../performance/interfaceTypes";
import { useState, useEffect } from "react";
import { RecordingDisplay } from "./performance/RecordingDisplay";
import { OriginDisplay } from "./performance/OriginDisplay";

interface PerformanceMockupProps {
  recordingId: string;
}

function PerformanceMockup({ recordingId }: PerformanceMockupProps) {
  const [result, setResult] = useState<string | PerformanceAnalysisResult>("initial");
  useEffect(() => {
    if (recordingId) {
      setResult("Fetching results...");
      fetchResult(recordingId).then(result => setResult(result));
    } else {
      setResult("recordingId URL param not specified");
    }
  }, [recordingId]);

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
