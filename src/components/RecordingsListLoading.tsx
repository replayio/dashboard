/**
 * Skeleton placeholder for the recordings list card — matches RecordingRow layout (thumb, title, meta, actions).
 */
export function RecordingsListLoading({ rowCount = 8 }: { rowCount?: number }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="relative flex flex-col min-h-[200px]"
    >
      <span className="sr-only">Loading recordings…</span>

      <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-primary/10">
        <div className="indeterminate h-full w-full bg-primary/70 origin-left" />
      </div>

      {Array.from({ length: rowCount }, (_, i) => (
        <div
          key={i}
          className="flex flex-row items-center gap-5 px-5 py-3.5 border-b border-border last:border-b-0 animate-pulse"
          aria-hidden
        >
          <div className="w-20 h-11 rounded-md bg-muted shrink-0 border border-border/50" />
          <div className="flex flex-col grow gap-2 min-w-0 py-0.5">
            <div
              className={`h-4 rounded-md bg-muted max-w-md ${
                i % 3 === 0 ? "w-3/5" : i % 3 === 1 ? "w-2/3" : "w-1/2"
              }`}
            />
            <div className="h-3 rounded-md bg-muted/70 w-full max-w-lg" />
          </div>
          <div className="flex flex-row items-center gap-4 shrink-0">
            <div className="w-4 h-4 rounded bg-muted" />
            <div className="w-20 h-3 rounded-md bg-muted hidden md:block" />
            <div className="w-5 h-5 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
