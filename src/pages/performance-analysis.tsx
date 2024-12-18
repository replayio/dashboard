import dynamic from "next/dynamic";

import { PerformanceAnalysisResult } from "../performance/interfaceTypes";
import { GetServerSideProps } from "next/types";
import { fetchPerformanceResult } from "@/performance/performanceResult";
import { VerticalLayout } from "@/components/VerticalLayout";

// Dynamically import your CRA's App component with SSR disabled
const PerformanceMockup = dynamic(() => import("../components/PerformanceMockup"), { ssr: false });

type PAProps =
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      recordingId: string;
      result: PerformanceAnalysisResult;
    };

export default function PerformanceAnalysis(props: PAProps) {
  if (props.status === "error") {
    return <div>Invalid or missing recordingId</div>;
  }

  return <PerformanceMockup recordingId={props.recordingId} result={props.result} />;
}

PerformanceAnalysis.Layout = VerticalLayout;

export const getServerSideProps: GetServerSideProps<PAProps> = async function ({
  params,
  req,
  query,
}) {
  const { recordingId } = query;

  if (typeof recordingId !== "string") {
    return {
      props: {
        status: "error",
        error: "Invalid or missing recordingId",
      },
    };
  }

  const result = await fetchPerformanceResult(recordingId);

  return {
    props: {
      status: "success",
      recordingId,
      result: result.analysisResult,
    },
  };
};
