import dynamic from "next/dynamic";

import { PerformanceAnalysisResult } from "@/performance/interfaceTypes";
import { GetServerSideProps } from "next/types";
import { fetchPerformanceResult } from "@/performance/performanceResult";
import { VerticalLayout } from "@/components/VerticalLayout";

import previousResult from "@/pageComponents/performance/performance-v3-v4-e81163b6-5444-4193-9f97-799fdd1b72cc.json";
import currentResult from "@/pageComponents/performance/performance-v3-v4-d23e4620-e253-4a0f-9035-02bd66a82a8e.json";

// Dynamically import your CRA's App component with SSR disabled
const PerformanceAnalysisDiff = dynamic(
  () => import("@/pageComponents/performance/PerformanceAnalysisDiff"),
  { ssr: false }
);

type PAProps =
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      recordingId: string;
      current: PerformanceAnalysisResult;
      previous: PerformanceAnalysisResult;
    };

export default function PerformanceAnalysisDiffPage(props: PAProps) {
  if (props.status === "error") {
    return <div>Invalid or missing recordingId</div>;
  }

  return <PerformanceAnalysisDiff current={props.current} previous={props.previous} />;
}

const DarkVerticalLayout = ({ children }: { children: React.ReactNode }) => (
  <VerticalLayout classNames={["dark"]}>{children}</VerticalLayout>
);

PerformanceAnalysisDiffPage.Layout = DarkVerticalLayout;

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

  return {
    props: {
      status: "success",
      recordingId,
      current: currentResult.analysisResult as PerformanceAnalysisResult,
      previous: previousResult.analysisResult as PerformanceAnalysisResult,
    },
  };
};
