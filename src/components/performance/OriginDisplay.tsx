import { OriginSummaryDisplay } from "./OriginSummaryDisplay";
import { TimelineEntry, TimelineEntryProps } from "./TimelineEntry";
import { OriginSummary, DependencyChainStep } from "../../performance/interfaceTypes";
import { useMemo, useState } from "react";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";

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

  const steps = useMemo(() => {
    const entries: TimelineEntryProps[] = [];
    let previous: DependencyChainStep | null = null;
    for (const step of summary.dependencySteps) {
      entries.push({ step, previous });
      previous = step;
    }
    return entries;
  }, [summary]);

  if (stepsExpanded) {
  }

  const triangle = stepsExpanded ? "▼" : "▶";

  return (
    <div className="m-2 gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">
      <OriginSummaryDisplay summary={summary}></OriginSummaryDisplay>
      <ExpandableSection
        grow={false}
        label={<h4 className="text-2xl font-bold">Detailed Steps</h4>}
      >
        <ul className="list-decimal ml-6">
          {steps.map(props => (
            <TimelineEntry key={`${props.step.time}${props.step.point}`} {...props}></TimelineEntry>
          ))}
        </ul>
      </ExpandableSection>
    </div>
  );
}
