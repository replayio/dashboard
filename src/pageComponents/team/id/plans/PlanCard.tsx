import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { ReactNode } from "react";

export type PlanCardProps = {
  eyebrow: string;
  badge?: string;
  title: string;
  description: string;
  // Either a numeric price (rendered as $X) or custom JSX (for "Custom"
  // / "$0" / "Coming soon" variants).
  priceDisplay: ReactNode;
  priceSubtitle?: string;
  inheritsFromLabel?: string;
  features: string[];
  ctaLabel: string;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
  ctaLoading?: boolean;
  // Renders the card with the highlighted "most popular" look.
  emphasized?: boolean;
  // If true, no CTA button is rendered; the card shows a "Current plan" label
  // in its place. Used in the Settings tier picker.
  isCurrent?: boolean;
  // If true, dims the card and disables CTA. Used to mark legacy plans in the
  // Settings picker.
  isLegacy?: boolean;
  "data-test-id"?: string;
};

export function PlanCard({
  eyebrow,
  badge,
  title,
  description,
  priceDisplay,
  priceSubtitle,
  inheritsFromLabel,
  features,
  ctaLabel,
  onCtaClick,
  ctaDisabled,
  ctaLoading,
  emphasized,
  isCurrent,
  isLegacy,
  "data-test-id": testId,
}: PlanCardProps) {
  return (
    <div
      className={
        "relative flex flex-col rounded-lg border p-6 bg-card text-card-foreground " +
        (emphasized ? "border-primary shadow-lg " : "border-border ") +
        (isLegacy ? "opacity-60" : "")
      }
      data-test-id={testId}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
          {badge}
        </span>
      )}

      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {eyebrow}
      </div>

      <h3 className="mb-2 text-lg font-semibold leading-tight">{title}</h3>

      <p className="mb-6 text-sm text-muted-foreground">{description}</p>

      <div className="mb-6">
        <div className="text-4xl font-bold leading-none">{priceDisplay}</div>
        {priceSubtitle && <div className="mt-2 text-xs text-muted-foreground">{priceSubtitle}</div>}
      </div>

      <div className="my-2 border-t border-border" />

      {inheritsFromLabel && (
        <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {inheritsFromLabel}
        </div>
      )}

      {!inheritsFromLabel && (
        <div className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Includes
        </div>
      )}

      <ul className="mb-6 flex flex-col gap-2 text-sm">
        {features.map(f => (
          <li key={f} className="flex flex-row items-start gap-2">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" type="check" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        {isCurrent ? (
          <div className="flex w-full items-center justify-center rounded-md bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
            Current plan
          </div>
        ) : (
          <Button
            className="w-full"
            disabled={ctaDisabled || ctaLoading}
            onClick={onCtaClick}
            size="large"
            variant={emphasized ? "solid" : "outline"}
            data-test-id={testId ? `${testId}-Cta` : undefined}
          >
            {ctaLoading ? "Working…" : ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
