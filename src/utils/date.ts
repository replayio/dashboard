export function getNumDaysAgo(date: Date) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  return currentDate.getDate() - startOfDay.getDate();
}

export function getRelativeDate({ daysAgo }: { daysAgo: number }) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(0, 0, 0, 0);
  return date;
}
