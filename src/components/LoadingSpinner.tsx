import { Icon } from "@/components/Icon";

export function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-row items-center gap-2 text-white p-2">
      <Icon className="w-4 h-4 animate-spin" type="loading-spinner" /> {label}
    </div>
  );
}
