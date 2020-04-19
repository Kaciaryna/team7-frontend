const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function shortDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTime(time: number): string {
  return time > 9 ? time.toString() : `0${time}`;
}

export function shortTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  return `${shortDate(timestamp)}, ${formatTime(date.getHours())}:${formatTime(date.getMinutes())} UTC`;
}
