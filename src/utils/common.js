const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

function capitalizeFirstLetter(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomArrayElement, capitalizeFirstLetter, updateItem };
