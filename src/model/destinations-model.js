import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destinations.js';

export default class DestinatonsModel extends Observable {
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getDestinationByName(name) {
    return this.#destinations.find((destination) => destination.name === name);
  }
}
