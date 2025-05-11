import AbstractView from '../framework/view/abstract-view.js';
import { DEFAULT_PRICE } from '../const.js';
import { convertDate } from '../utils/main.js';
import { DateFormat } from '../const.js';

function createDestinationNames(destinations) {
  if (!destinations || destinations.length === 0) {
    return '';
  }

  if (destinations.length <= 3) {
    return destinations.join(' &mdash; ');
  }

  return `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}`;
}

function createRouteDuration(duration) {
  const startDate = convertDate(duration.start, DateFormat.ROUTE);
  const endDate = convertDate(duration.end, DateFormat.ROUTE);
  return `${startDate}&nbsp;&mdash;&nbsp;${endDate}`;
}

function createInfoTripTemplate({ destinations, duration, totalPrice }) {
  return (
    `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createDestinationNames(destinations)}</h1>
        <p class="trip-info__dates">${createRouteDuration(duration)}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice || DEFAULT_PRICE}</span>
      </p>
    </section>`
  );
}

export default class InfoTripView extends AbstractView {
  #destinations = null;
  #duration = null;
  #totalPrice = DEFAULT_PRICE;

  constructor({ destinations, duration, totalPrice }) {
    super();
    this.#destinations = destinations;
    this.#duration = duration;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createInfoTripTemplate({
      destinations: this.#destinations,
      duration: this.#duration,
      totalPrice: this.#totalPrice
    });
  }
}
