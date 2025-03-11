import { getRandomArrayElement } from '../util.js';

const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '25/12/19 16:00',
    dateTo: '25/12/19 18:00',
    destination: 11,
    isFavorite: false,
    offers: [
      'taxi-1'
    ],
    type: 'taxi'
  },

  {
    id: 2,
    basePrice: 2000,
    dateFrom: '01/01/19 10:00',
    dateTo: '01/01/19 13:00',
    destination: 12,
    isFavorite: false,
    offers: [
      'flight-2',
      'flight-3'
    ],
    type: 'flight'
  },

  {
    id: 3,
    basePrice: 1500,
    dateFrom: '13/06/19 15:00',
    dateTo: '14/06/19 10:00',
    destination: 13,
    isFavorite: false,
    offers: [],
    type: 'train'
  },

  {
    id: 4,
    basePrice: 1100,
    dateFrom: '01/05/19 09:00',
    dateTo: '01/05/19 13:00',
    destination: 14,
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },

  {
    id: 5,
    basePrice: 500,
    dateFrom: '21/08/19 16:00',
    dateTo: '21/08/19 18:00',
    destination: 15,
    isFavorite: true,
    offers: [
      'restaurant-2'
    ],
    type: 'restaurant'
  },
];

const getRandomPoints = () => getRandomArrayElement(mockPoints);

export { getRandomPoints };
