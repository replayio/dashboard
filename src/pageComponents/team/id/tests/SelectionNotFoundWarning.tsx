export function SelectionNotFoundWarning({ name }: { name: string }) {
  return (
    <div
      className="flex flex-col px-2 py-1 rounded bg-yellow-400 text-black mx-2 mb-1"
      date-test-name="SelectionNotFoundWarning"
    >
      <div>The {name} you are trying to view was not found</div>
      <div className="text-xs">
        Try changing the filter options above. If this does not work, it may be because the data is
        too old to be loaded.
      </div>
    </div>
  );
}
