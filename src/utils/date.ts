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
  minutesAgo,
}: {
  daysAgo?: number;
  hoursAgo?: number;
  minutesAgo?: number;
}) {
  const date = new Date();

  if (daysAgo !== undefined) {
    date.setTime(date.getTime() - 1000 * 60 * 60 * 24 * daysAgo);
  }

  if (hoursAgo !== undefined) {
    date.setTime(date.getTime() - 1000 * 60 * 60 * hoursAgo);
  }

  if (minutesAgo !== undefined) {
    date.setTime(date.getTime() - 1000 * 60 * minutesAgo);
  }

  return date;
}

export function getStartOfDayUTC(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  return Date.UTC(year, month, day, 0, 0, 0, 0);
}
