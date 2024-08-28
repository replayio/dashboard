import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Dynamically import your CRA's App component with SSR disabled
const PerformanceMockup = dynamic(() => import("../components/PerformanceMockup"), { ssr: false });

export default function PerformanceAnalysis() {
  const router = useRouter();
  const { recordingId } = router.query;

  if (typeof recordingId !== "string") {
    return <div>Invalid or missing recordingId</div>;
  }

  return <PerformanceMockup recordingId={recordingId} />;
}
