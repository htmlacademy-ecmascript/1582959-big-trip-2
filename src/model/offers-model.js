import { mockOffers } from '../mock/offers.js';

export default class OffersModel {
  offers = mockOffers;

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type);
  }
}
