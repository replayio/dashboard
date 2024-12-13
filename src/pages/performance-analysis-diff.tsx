import dynamic from "next/dynamic";

import { PerformanceAnalysisResult } from "@/performance/interfaceTypes";
import { GetServerSideProps } from "next/types";
import {
  fetchPerformanceResult,
  fetchWorkspacePerformanceAnalysis,
} from "@/performance/performanceResult";
import { VerticalLayout } from "@/components/VerticalLayout";

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

  try {
    const currentResult = await fetchPerformanceResult(recordingId);
    if (!currentResult) {
      throw new Error("Recording not found");
    }

    console.log("Current result spec", currentResult.analysisResult.spec);

    const workspaceId = currentResult.analysisResult.spec.metadata?.workspaceId;

    if (!workspaceId) {
      throw new Error("Workspace data not found");
    }

    const workspaceData = await fetchWorkspacePerformanceAnalysis(workspaceId);

    console.log("Workspace data size", workspaceData.length, workspaceData.slice(-1));

    const recentMainRecordings = workspaceData
      .filter(entry => entry.metadata?.branch === "main")
      .slice(-5);

    console.log("Recent main results: ", recentMainRecordings);

    if (recentMainRecordings.length === 0) {
      throw new Error("No main branch recordings found");
    }

    const recentResults = await Promise.all(
      recentMainRecordings.map(entry => fetchPerformanceResult(entry.recordingId))
    );

    const [previousResult] = recentResults.slice(-1);

    return {
      props: {
        status: "success",
        recordingId,
        current: currentResult.analysisResult as PerformanceAnalysisResult,
        previous: previousResult.analysisResult as PerformanceAnalysisResult,
      },
    };
  } catch (e: any) {
    return {
      props: {
        status: "error",
        error: e.message,
      },
    };
  }
};
