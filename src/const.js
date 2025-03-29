const POINT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const DESTINATIONS = [
  'Chamonix',
  'Geneva',
  'Amsterdam',
  'Moscow',
  'London'
];

const DateFormat = {
  DAY: 'MMM D',
  TIME: 'HH:mm',
  FULL: 'YYYY-MM-DD',
  DAY_TIME: 'DD/MM/YY HH:mm'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export { DESCRIPTIONS, DESTINATIONS, DateFormat, POINT_TYPES, FilterType, Mode };
