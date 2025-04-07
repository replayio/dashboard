export function assert(v: any) {
  if (!v) {
    throw new Error("Assertion Failed!");
  }
}

export function formatMsToHMS(ms: number) {
  const milliseconds = (ms % 1000) / 100;
  const seconds = (ms / 1000) % 60;
  const minutes = (ms / (1000 * 60)) % 60;
  const hours = (ms / (1000 * 60 * 60)) % 24;

  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${milliseconds}`;
}

export function formatTime(ms: number) {
  return Math.round(ms) + " ms";
}
