import { PageLoadingPlaceholder } from "@/components/PageLoadingPlaceholder";

export default function Loading() {
  return (
    <div className="flex flex-row gap-2 p-2 h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12">
        <PageLoadingPlaceholder />
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12"></div>
      <div className="bg-slate-800 text-white p-2 rounded basis-4/12"></div>
    </div>
  );
}
