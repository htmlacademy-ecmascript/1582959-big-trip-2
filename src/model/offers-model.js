import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = [];
  offersApiService = null;

  constructor({ offersApiService }) {
    super();
    this.offersApiService = offersApiService;
  }

  async init() {
    try {
      this.#offers = await this.offersApiService.offers;

    } catch (error) {
      this.#offers = [];
    }
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }
}
