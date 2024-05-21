import { Icon } from "@/components/Icon";
import { Fragment } from "react";

export function MultiStepForm({ currentIndex, steps }: { currentIndex: number; steps: string[] }) {
  return (
    <div
      className="flex items-center w-full text-sm text-center whitespace-nowrap font-medium"
      data-test-name="MultiStepForm"
    >
      {steps.map((step, index) => {
        const isCompleted = currentIndex > index;
        const isCurrent = currentIndex === index;

        return (
          <Fragment key={index}>
            <div
              className={`shrink-0 flex flex-rol items-center gap-2 ${isCurrent || isCompleted ? "text-white" : "text-slate-400"}`}
              data-test-name={`MultiStepForm-Step-${index + 1}`}
              data-test-state={isCurrent ? "current" : isCompleted ? "complete" : "incomplete"}
            >
              {isCompleted ? (
                <Icon className="w-6 h-6 text-green-600" type="step-complete" />
              ) : (
                <div className="w-6 h-6 flex items-center justify-center relative">
                  <Icon className="w-6 h-6 absolute" type="step-incomplete" />
                  <span className="text-slate-900 relative text-xs">{index + 1}</span>
                </div>
              )}
              <span>{step}</span>
            </div>

            {index < steps.length - 1 && <div className="grow h-px w-full bg-slate-600 mx-4" />}
          </Fragment>
        );
      })}
    </div>
  );
}
