import { getRandomInteger, getRandomArrayElement } from '../util.js';
import { MAX_VALUE, DESCRIPTIONS, DESTINATIONS } from '../const.js';

const mockDestinations = [
  {
    id: 11,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },

  {
    id: 12,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: []
  },

  {
    id: 13,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },

  {
    id: 14,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },

  {
    id: 15,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_VALUE)}`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
];

export { mockDestinations };
