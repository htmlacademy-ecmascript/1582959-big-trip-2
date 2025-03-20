import { getRandomArrayElement } from '../util.js';
import { DESCRIPTIONS, DESTINATIONS } from '../const.js';

const mockDestinations = [
  {
    id: 11,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: 'https://img.goodfon.ru/original/3901x2600/d/be/hong-kong-gonkong-megapolis.jpg',
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: 'https://i.pinimg.com/originals/55/88/75/5588755d55ffe02e389ae85168d8fac1.jpg',
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: 'https://avatars.mds.yandex.net/i?id=4b62e59248144abdfba88e5378356f17_l-12525508-images-thumbs&n=13',
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_City_London.jpg/1600px-The_City_London.jpg',
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
        src: 'https://avatars.mds.yandex.net/i?id=f9e425807be3be06c12bd94bd549ffb3_l-5205329-images-thumbs&n=13',
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
        src: 'https://i.pinimg.com/originals/57/9a/81/579a8119c135c5035bbd4e96df124c31.jpg',
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: 'https://static.wikia.nocookie.net/366c9f7e-a384-4f72-9e83-c2276bb1488a/scale-to-width/755',
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
        src: 'https://avatars.mds.yandex.net/i?id=c45cc78c5548fe72ac9b3154c1126e03_l-4307487-images-thumbs&n=13',
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: 'https://avatars.mds.yandex.net/i?id=484bd843fb585f08109145a6e38cd1a4_l-8311862-images-thumbs&n=13',
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: 'https://i01.fotocdn.net/s205/77d119845fc25c49/public_pin_l/2327635410.jpg',
        description: getRandomArrayElement(DESCRIPTIONS)
      },
      {
        src: 'https://static1-repo.aif.ru/1/2c/505851/3ea44e467eca224b7987f3adf1078846.jpg',
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  },
];

export { mockDestinations };
