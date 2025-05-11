import InfoTripView from '../view/info-trip-view.js';
import { remove, render, replace, RenderPosition } from '../framework/render.js';

export default class InfoTripPresenter {
  #tripMainContainer = null;
  #infoComponent = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({ tripMainContainer, pointsModel, offersModel, destinationsModel }) {
    this.#tripMainContainer = tripMainContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  #getDestinations() {
    const points = [...this.#pointsModel.points].sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
    const destinations = [];

    points.forEach((point) => {
      const destination = this.#destinationsModel.getDestinationById(point.destination);
      if (destination) {
        destinations.push(destination.name);
      }
    });

    return destinations;
  }

  #getDuration() {
    const points = [...this.#pointsModel.points].sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
    if (points.length === 0) {
      return { start: null, end: null };
    }

    return {
      start: points[0].dateFrom,
      end: points[points.length - 1].dateTo
    };
  }

  #calculateTotalPrice() {
    const points = this.#pointsModel.points;
    let totalPrice = 0;

    points.forEach((point) => {
      totalPrice += point.basePrice;
      const offers = this.#offersModel.getOffersByType(point.type);
      if (offers && offers.offers) {
        offers.offers.forEach((offer) => {
          if (point.offers.includes(offer.id)) {
            totalPrice += offer.price;
          }
        });
      }
    });

    return totalPrice;
  }

  init() {
    if (!this.#pointsModel.points.length) {
      this.destroy();
      return;
    }

    const prevInfoComponent = this.#infoComponent;
    this.#infoComponent = new InfoTripView({
      destinations: this.#getDestinations(),
      duration: this.#getDuration(),
      totalPrice: this.#calculateTotalPrice()
    });

    if (!prevInfoComponent) {
      render(this.#infoComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  destroy() {
    remove(this.#infoComponent);
  }

  #handleModelEvent = () => this.init();
}
