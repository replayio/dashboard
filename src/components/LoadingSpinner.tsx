import { Icon } from "@/components/Icon";

export function LoadingSpinner() {
  return (
    <div className="flex flex-row items-center gap-1 text-white p-2">
      <Icon className="w-4 h-4 animate-spin" type="loading-spinner" />{" "}
      Loading...
    </div>
  );
}
