import { OriginSummaryDisplay } from "./OriginSummaryDisplay";
import { TimelineEntry, TimelineEntryProps, isNetworkResponse } from "./TimelineEntry";
import { OriginSummary, DependencyChainStep } from "../../performance/interfaceTypes";
import { useMemo } from "react";
import { ExpandableSection } from "@/pageComponents/team/id/runs/ExpandableSection";

// Displays all information for an originating event.

interface OriginDisplayProps {
  summary: OriginSummary;
}

export function OriginDisplay(props: OriginDisplayProps) {
  const { summary } = props;

  const steps = useMemo(() => {
    // Fixup the dependency steps to paper over some unknown
    // nodes/edges we might encounter.
    const dependencySteps: DependencyChainStep[] = summary.dependencySteps.filter(step => {
      if (step.code == "UnknownEdge" && (step.edge as any).kind == "executionParent") {
        return false;
      }
      return true;
    }).map(step => {
      const time = (step.time ?? 0) - (summary.dependencySteps[0]!.time ?? 0);
      if (step.code == "UnknownNode" && (step.node as any).kind == "websocketNewMessage") {
        return { ...step, code: "WebSocketMessageReceived", time };
      }
      return { ...step, time };
    });

    const entries: TimelineEntryProps[] = [];
    for (let i = 0; i < dependencySteps.length; i++) {
      const step = dependencySteps[i]!;
      const previous = dependencySteps[i - 1] ?? null;
      const next = dependencySteps[i + 1] ?? null;
      entries.push({ step, previous, next });
    }
    return entries;
  }, [summary]);

  const baseEntries = steps.map((props, i) => {
    const key = `${JSON.stringify(summary.origin)}:${i}`;
    return <TimelineEntry key={key} {...props}></TimelineEntry>;
  });

  const timelineEntries: JSX.Element[] = [];
  for (let i = 0; i < steps.length; i++) {
    let separator = null;
    const elapsed = Math.max(0, (steps[i]!.step.time ?? 0) - (steps[i - 1]?.step.time ?? 0));
    if (elapsed > 40) {
      separator = <div
        className="TimelineEntrySeparator"
        key={`sep-${baseEntries[i]!.key}`}
        style={{ height: `${elapsed}px` }}
      ></div>;
    }

    if (isNetworkResponse(steps[i]!.step)) {
      timelineEntries.push(<div className="TimelineEntryNetwork" key={baseEntries[i]!.key}>
        {baseEntries[i - 1]}
        {separator}
        {baseEntries[i]}
      </div>);
    } else {
      if (separator) {
        timelineEntries.push(separator);
      }
      if (steps[i + 1] && isNetworkResponse(steps[i + 1]!.step)) {
        // ignore
      } else {
        timelineEntries.push(baseEntries[i]!);
      }
    }
  }

  return (
    <div className="m-2 gap-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">
      <OriginSummaryDisplay summary={summary}></OriginSummaryDisplay>
      <ExpandableSection
        grow={false}
        label={<h4 className="text-2xl font-bold">Detailed Steps</h4>}
      >
        <ul>
          {timelineEntries}
        </ul>
      </ExpandableSection>
    </div>
  );
}
