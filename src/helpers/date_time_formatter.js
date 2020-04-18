const MONTHS =
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

export default class Date {
  static short(date) {
    return `${date.getDay()} ${MONTHS[date.getMonth() - 1]} ${date.getYear()}`
  }

  static full(date) {
    return `${date.getDay()} ${MONTHS[date.getMonth() - 1]} ${date.getYear()}, ${date.getHour()}:${date.getMinute()} UTC`
  }
}

