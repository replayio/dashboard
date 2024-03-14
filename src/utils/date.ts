export function getNumDaysAgo(date: Date) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  return currentDate.getDate() - startOfDay.getDate();
}

export function getRelativeDate({
  daysAgo,
  hoursAgo,
}: {
  daysAgo?: number;
  hoursAgo?: number;
}) {
  const date = new Date();
  if (daysAgo !== undefined) {
    date.setDate(date.getDate() - daysAgo);
    date.setHours(0, 0, 0, 0);
  } else if (hoursAgo !== undefined) {
    date.setHours(date.getHours() - hoursAgo);
    date.setSeconds(0, 0);
  }
  return date;
}
