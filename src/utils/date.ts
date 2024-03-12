export function getRelativeDate({ daysAgo }: { daysAgo: number }) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(0, 0, 0, 0);
  return date;
}
