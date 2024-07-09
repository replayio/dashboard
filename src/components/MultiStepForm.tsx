import { Icon } from "@/components/Icon";
import { Fragment } from "react";

export function MultiStepForm({ currentIndex, steps }: { currentIndex: number; steps: string[] }) {
  return (
    <div
      className="flex items-center w-full text-center font-md text-md whitespace-nowrap"
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
                <Icon className="w-6 h-6 text-sky-400" type="step-complete" />
              ) : (
                <div className="relative flex items-center justify-center w-6 h-6">
                  <Icon className="absolute w-6 h-6" type="step-incomplete" />
                  <span className="relative text-xs text-slate-900">{index + 1}</span>
                </div>
              )}
              <span>{step}</span>
            </div>

            {index < steps.length - 1 && <div className="w-full h-px mx-4 grow bg-slate-600" />}
          </Fragment>
        );
      })}
    </div>
  );
}
