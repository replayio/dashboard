import { Badge } from "@/components/ui/badge";

type DBProps = {
  value: number;
  unit: string;
  reverseColors?: boolean;
};

export const DiffBadge = ({ value, unit, reverseColors = false }: DBProps) => (
  <Badge
    variant={
      value > 0
        ? reverseColors
          ? "default"
          : "secondary"
        : reverseColors
          ? "secondary"
          : "default"
    }
  >
    {value > 0 ? "+" : ""}
    {value.toFixed(2)} {unit}
  </Badge>
);
