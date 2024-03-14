import { FilterInput } from "@/app/team/[id]/tests/FilterInput";
import { RangeMenu } from "@/app/team/[id]/tests/RangeMenu";
import { SortByMenu } from "@/app/team/[id]/tests/SortByMenu";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    filter?: string;
    range?: string;
    sortBy?: string;
    testId?: string;
  };
}) {
  const filter = searchParams.filter ?? "";
  const range = searchParams.range ?? "";
  const sortBy = searchParams.sortBy ?? "";
  const testId = searchParams.testId ?? "";

  const selectedTest = null; // TODO

  return (
    <div className="flex flex-row gap-2 overflow-auto overflow-hidden p-2 h-full">
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="basis-2/4 shrink overflow-auto">
              <SortByMenu />
            </div>
            <div className="basis-2/4 shrink overflow-auto">
              <RangeMenu />
            </div>
          </div>
          <FilterInput />
        </div>
        <div className="overflow-y-auto -mx-1">{/* TODO Test list */}</div>
        <div className="flex items-center justify-center text-slate-300 h-full">
          Not implemented yet...
        </div>
      </div>
      <div className="bg-slate-800 text-white p-2 rounded basis-2/4 overflow-auto flex flex-col gap-2">
        {selectedTest ? (
          <div className="overflow-auto -mx-1">{/* TODO Test list */}</div>
        ) : (
          <div className="flex items-center justify-center text-slate-300 h-full">
            Select a test to see its details here
          </div>
        )}
      </div>
    </div>
  );
}
