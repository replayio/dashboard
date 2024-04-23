import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";
import { differenceInMinutes } from "date-fns/differenceInMinutes";
import { differenceInMonths } from "date-fns/differenceInMonths";
import { differenceInSeconds } from "date-fns/differenceInSeconds";
import { differenceInWeeks } from "date-fns/differenceInWeeks";
import { differenceInYears } from "date-fns/differenceInYears";
import padStart from "lodash/padStart";
import prettyMilliseconds from "pretty-ms";

export function formatCurrency(amount: number) {
  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
}

export function formatDuration(ms: number) {
  return prettyMilliseconds(ms, { millisecondsDecimalDigits: 1 });
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

export function formatPercentage(amount: number) {
  const formatter = new Intl.NumberFormat("en-us", { style: "percent" });
  return formatter.format(amount);
}

export function formatRelativeTime(date: Date): string {
  const seconds = differenceInSeconds(Date.now(), date);
  const minutes = differenceInMinutes(Date.now(), date);
  const days = differenceInCalendarDays(Date.now(), date);
  const weeks = differenceInWeeks(Date.now(), date);
  const months = differenceInMonths(Date.now(), date);
  const years = differenceInYears(Date.now(), date);

  if (years > 0) {
    return `${years}y`;
  } else if (months > 0) {
    return `${months}mo`;
  } else if (weeks > 0) {
    return `${weeks}w`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (minutes >= 60) {
    return `${Math.floor(minutes / 60)}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else if (seconds > 0) {
    return `${seconds}s`;
  }

  return "Now";
}

export function formatTimestamp(ms: number, showHighPrecision: boolean = false) {
  const seconds = showHighPrecision ? Math.floor(ms / 1000) : Math.round(ms / 1000.0);
  const minutesString = Math.floor(seconds / 60);
  const secondsString = padStart(String(seconds % 60), 2, "0");
  if (showHighPrecision) {
    const millisecondsString = padStart(`${Math.round(ms) % 1000}`, 3, "0");
    return `${minutesString}:${secondsString}.${millisecondsString}`;
  } else {
    return `${minutesString}:${secondsString}`;
  }
}
