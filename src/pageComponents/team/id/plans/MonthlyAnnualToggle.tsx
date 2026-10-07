export type BillingCadence = "monthly" | "annual";

export function MonthlyAnnualToggle({
  cadence,
  onChange,
  savingsLabel = "Save 15%",
}: {
  cadence: BillingCadence;
  onChange: (next: BillingCadence) => void;
  savingsLabel?: string;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-3 text-sm">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={
          "px-1 py-1 transition-colors " +
          (cadence === "monthly"
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground")
        }
        aria-pressed={cadence === "monthly"}
        data-test-id="PlanPicker-Cadence-Monthly"
      >
        Monthly
      </button>

      <button
        type="button"
        role="switch"
        aria-checked={cadence === "annual"}
        aria-label="Toggle billing cadence"
        onClick={() => onChange(cadence === "annual" ? "monthly" : "annual")}
        className={
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors " +
          (cadence === "annual" ? "bg-primary" : "bg-muted")
        }
      >
        <span
          className={
            "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform " +
            (cadence === "annual" ? "translate-x-5" : "translate-x-0")
          }
        />
      </button>

      <button
        type="button"
        onClick={() => onChange("annual")}
        className={
          "px-1 py-1 transition-colors " +
          (cadence === "annual"
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground")
        }
        aria-pressed={cadence === "annual"}
        data-test-id="PlanPicker-Cadence-Annual"
      >
        Annual
      </button>

      <span className="ml-1 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
        {savingsLabel}
      </span>
    </div>
  );
}
