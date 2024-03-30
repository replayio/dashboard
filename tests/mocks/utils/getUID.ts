const idCounters: { [key: string]: number } = {};

export function getUID(prefix: string): string {
  const counter = idCounters[prefix] ?? 0;
  idCounters[prefix] = counter + 1;

  return `${prefix}-${counter}`;
}
