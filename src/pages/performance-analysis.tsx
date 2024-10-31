import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { PerformanceAnalysisResult, Version } from "../performance/interfaceTypes";
import { GetServerSideProps } from "next/types";
import { fetchPerformanceResult } from "@/performance/performanceResult";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { VerticalLayout } from "@/components/VerticalLayout";

// Dynamically import your CRA's App component with SSR disabled
const PerformanceMockup = dynamic(() => import("../components/PerformanceMockup"), { ssr: false });

type PAProps =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "success";
      recordingId: string;
      result: PerformanceAnalysisResult;
    };

export default function PerformanceAnalysis(props: PAProps) {
  if (props.type === "error") {
    return <div>Invalid or missing recordingId</div>;
  }

  return <PerformanceMockup recordingId={props.recordingId} result={props.result} />;
}

PerformanceAnalysis.Layout = VerticalLayout;

export const getServerSideProps: GetServerSideProps = async function ({ params, req, query }) {
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
      result,
    },
  };
};
