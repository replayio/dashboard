import { Badge } from "@/components/ui/badge";

type PossibleVariants = NonNullable<React.ComponentProps<typeof Badge>["variant"]>;

type DBProps = {
  value: number;
  unit: string;
  primaryVariant?: PossibleVariants;
  secondaryVariant?: PossibleVariants;
  reverseColors?: boolean;
};

export const DiffBadge = ({
  value,
  unit,
  reverseColors = false,
  primaryVariant = "default",
  secondaryVariant = "secondary",
}: DBProps) => (
  <Badge
    variant={
      value > 0
        ? reverseColors
          ? primaryVariant
          : secondaryVariant
        : reverseColors
          ? secondaryVariant
          : primaryVariant
    }
  >
    {value > 0 ? "+" : ""}
    {value.toFixed(2)} {unit}
  </Badge>
);

type DHBProps = Pick<DBProps, "value" | "unit" | "reverseColors">;

export const DeviationHighlightBadge = ({ value, unit, reverseColors }: DHBProps) => {
  const isDeviation = value > 0;
  return (
    <DiffBadge
      value={value}
      unit={unit}
      reverseColors={reverseColors}
      secondaryVariant={isDeviation ? "destructive" : "secondary"}
    />
  );
};
