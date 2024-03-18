export function LoadingProgressBar() {
  return (
    <div className="absolute left-0 top-0 w-full">
      <div className="h-1 w-full bg-sky-500/25 overflow-hidden">
        <div className="indeterminate w-full h-full bg-sky-500 origin-left"></div>
      </div>
    </div>
  );
}
