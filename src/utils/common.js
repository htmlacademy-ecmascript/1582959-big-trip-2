const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

function capitalizeFirstLetter(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

export { getRandomArrayElement, capitalizeFirstLetter };
