export function assert(v: any) {
  if (!v) {
    throw new Error("Assertion Failed!");
  }
}

export function formatTime(ms: number) {
  return Math.round(ms) + " ms";
}
