import { OriginSummaryDisplay } from "./OriginSummaryDisplay";
import { TimelineEntry, TimelineEntryProps } from "./TimelineEntry";
import { OriginSummary, DependencyChainStep } from "../interfaceTypes";
import { useState } from "react";

// Displays all information for an originating event.

interface OriginDisplayProps {
  summary: OriginSummary;
}

export function OriginDisplay(props: OriginDisplayProps) {
  const [stepsExpanded, setStepsExpanded] = useState(false);

  function toggleSteps() {
    setStepsExpanded(!stepsExpanded);
  }

  const { summary } = props;

  const entries: TimelineEntryProps[] = [];
  if (stepsExpanded) {
    let previous: DependencyChainStep | null = null;
    for (const step of summary.dependencySteps) {
      entries.push({ step, previous });
      previous = step;
    }
  }

  const triangle = stepsExpanded ? "▼" : "▶";

  return <div>
    <OriginSummaryDisplay summary={summary}></OriginSummaryDisplay>
    <div className="SummaryTitle" onClick={toggleSteps}>{triangle + " Steps"}</div>
    {
      entries.map(props => (<TimelineEntry {...props}></TimelineEntry>))
    }
  </div>;
}
