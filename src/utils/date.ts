export function formatRelativeDate(date: Date) {
  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit",
    numeric: "auto",
    style: "long",
  });

  const ends = Math.ceil((date.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
  return rtf.format(ends, "day");
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
