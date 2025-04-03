import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;

function convertDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function getEventDuration(dateFrom, dateTo) {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const diffInMinutes = end.diff(start, 'minute');

  const days = Math.floor(diffInMinutes / MINUTES_IN_DAY);
  const hours = Math.floor((diffInMinutes - days * MINUTES_IN_DAY) / MINUTES_IN_HOUR);
  const minutes = diffInMinutes - (days * MINUTES_IN_DAY + hours * MINUTES_IN_HOUR);

  const daysOutput = (days) ? `${days}D` : '';
  const hoursOutput = (hours) ? `${hours}H` : '';
  const minutesOutput = (minutes) ? `${minutes}M` : '00M';

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
}

const isFuturePoint = ({ dateFrom }) => dayjs().isBefore(dateFrom, 'day');
const isPresentPoint = ({ dateFrom }) => dayjs().isSame(dateFrom, 'day');
const isPastPoint = ({ dateFrom }) => dayjs().isAfter(dateFrom, 'day');

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return dayjs(dateA).diff(dayjs(dateB), 'days');
}

function sortByDay(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight;
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function calculateDuration(point) {
  const dateFrom = dayjs(point.dateFrom);
  const dateTo = dayjs(point.dateTo);

  return dateTo.diff(dateFrom);
}

function sortByTime(pointA, pointB) {
  return calculateDuration(pointB) - calculateDuration(pointA);
}

export { convertDate, getEventDuration, isFuturePoint, isPresentPoint, isPastPoint, sortByDay, sortByPrice, sortByTime };
