import {DateTimeUTC} from "domain-ps/lib/definitions/types/date_pb";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function shortDate(date: DateTimeUTC): string {
  return `${date.getDay()} ${MONTHS[date.getMonth() - 1]} ${date.getYear()}`;
}

export function shortTime(date: DateTimeUTC): string {
  return `${date.getDay()} ${MONTHS[date.getMonth() - 1]} ${date.getYear()}, ${date.getHour()}:${date.getMinute()} UTC`;
}

