const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function shortDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function shortTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()} UTC`;
}

