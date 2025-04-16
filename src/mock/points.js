import { getRandomArrayElement } from '../utils/common.js';
import { nanoid } from 'nanoid';

const mockPoints = [
  {
    basePrice: 1255,
    dateFrom: '12/12/25 16:00',
    dateTo: '12/12/25 16:43',
    destination: 11,
    isFavorite: false,
    offers: [
      'taxi-1'
    ],
    type: 'taxi'
  },

  {
    basePrice: 1255,
    dateFrom: '12/12/25 16:00',
    dateTo: '12/12/25 16:43',
    destination: 11,
    isFavorite: false,
    offers: [
      'bus-1'
    ],
    type: 'bus'
  },

  {
    basePrice: 2000,
    dateFrom: '01/01/19 10:00',
    dateTo: '01/01/19 13:00',
    destination: 12,
    isFavorite: true,
    offers: [
      'flight-1',
      'flight-2',
      'flight-3'
    ],
    type: 'flight'
  },

  {
    basePrice: 1500,
    dateFrom: '02/06/23 15:00',
    dateTo: '02/07/23 16:00',
    destination: 13,
    isFavorite: false,
    offers: [],
    type: 'train'
  },

  {
    basePrice: 1100,
    dateFrom: '10/05/20 09:00',
    dateTo: '10/05/20 13:00',
    destination: 14,
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },

  {
    basePrice: 500,
    dateFrom: '08/21/22 16:00',
    dateTo: '08/21/22 18:00',
    destination: 15,
    isFavorite: true,
    offers: [
      'restaurant-2'
    ],
    type: 'restaurant'
  },
];

function getRandomPoints() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export { getRandomPoints };
