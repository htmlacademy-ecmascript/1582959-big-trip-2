import { mockDestinations } from '../mock/destinations.js';

export default class DestinatonsModel {
  destinations = mockDestinations;

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
