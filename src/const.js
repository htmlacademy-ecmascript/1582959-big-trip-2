const DEFAULT_PRICE = 0;
const DEFAULT_TYPE = 'flight';

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const DateFormat = {
  DAY: 'MMM D',
  TIME: 'HH:mm',
  FULL: 'YYYY-MM-DD',
  ROUTE: 'D MMM',
  DAY_TIME: 'DD/MM/YY HH:mm'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const BLANK_POINT = {
  basePrice: DEFAULT_PRICE,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  offers: [],
  offersPoint: [],
  type: DEFAULT_TYPE,
  name: ''
};

export { DateFormat, DEFAULT_PRICE, POINT_TYPES, FilterType, Mode, SortType, UserAction, UpdateType, BLANK_POINT, DEFAULT_TYPE };
