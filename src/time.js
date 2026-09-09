export const KERBIN_DAYS_PER_YEAR = 426;
export const KERBIN_HOURS_PER_DAY = 6;
export const SECONDS_PER_DAY = KERBIN_HOURS_PER_DAY * 60 * 60;
export const SECONDS_PER_YEAR = KERBIN_DAYS_PER_YEAR * SECONDS_PER_DAY;

export function secondsToTimeParts(totalSeconds, useOneBasedCalendar) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  let remaining = safeSeconds;

  const yearsElapsed = Math.floor(remaining / SECONDS_PER_YEAR);
  remaining -= yearsElapsed * SECONDS_PER_YEAR;

  const daysElapsed = Math.floor(remaining / SECONDS_PER_DAY);
  remaining -= daysElapsed * SECONDS_PER_DAY;

  const hours = Math.floor(remaining / 3600);
  remaining -= hours * 3600;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining - minutes * 60;

  if (useOneBasedCalendar) {
    return {
      years: yearsElapsed + 1,
      days: daysElapsed + 1,
      hours,
      minutes,
      seconds,
    };
  }

  return {
    years: yearsElapsed,
    days: daysElapsed,
    hours,
    minutes,
    seconds,
  };
}

export function timePartsToSeconds(parts, useOneBasedCalendar) {
  const years = Math.max(0, Math.floor(parts.years));
  const days = Math.max(0, Math.floor(parts.days));
  const hours = Math.max(0, Math.floor(parts.hours));
  const minutes = Math.max(0, Math.floor(parts.minutes));
  const seconds = Math.max(0, Math.floor(parts.seconds));

  if (useOneBasedCalendar) {
    const yearsElapsed = Math.max(0, years - 1);
    const daysElapsed = Math.max(0, days - 1);
    return yearsElapsed * SECONDS_PER_YEAR + daysElapsed * SECONDS_PER_DAY + hours * 3600 + minutes * 60 + seconds;
  }

  return years * SECONDS_PER_YEAR + days * SECONDS_PER_DAY + hours * 3600 + minutes * 60 + seconds;
}
