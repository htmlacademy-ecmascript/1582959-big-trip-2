import AbstractView from '../framework/view/abstract-view.js';
import { DateFormat } from '../const.js';
import { convertDate, getEventDuration } from '../utils/main.js';

function createOffersTemplate(offersPoint, offers) {
  if (offersPoint.offers) {
    const filteredOffers = offersPoint.offers.filter((offer) => offers.includes(offer.id));
    return (
      filteredOffers.map(({ title, price }) => (
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>`)).join('')
    );
  }
  return '';
}

function createPointTemplate(point, destinations, offersPoint) {
  const { basePrice, type, dateFrom, dateTo, isFavorite, offers } = point;

  const date = convertDate(dateFrom, DateFormat.DAY);
  const dateStart = convertDate(dateFrom, DateFormat.FULL);
  const dateEnd = convertDate(dateTo, DateFormat.FULL);
  const timeStart = convertDate(dateFrom, DateFormat.TIME);
  const timeEnd = convertDate(dateTo, DateFormat.TIME);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateStart}">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destinations.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateStart}T${timeStart}">${timeStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateEnd}T${timeEnd}">${timeEnd}</time>
        </p>
        <p class="event__duration">${getEventDuration(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${createOffersTemplate(offersPoint, offers)}
      </ul>
      <button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
}

export default class PointView extends AbstractView {

  #point = null;
  #destinations = null;
  #offersPoint = null;
  #handlePointRollupButtonClick = null;
  #handleFavoriteButtonClick = null;

  constructor({ point, destinations, allDestinations, offers, onRollupButtonClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.allDestinations = allDestinations;
    this.#offersPoint = offers;
    this.#handlePointRollupButtonClick = onRollupButtonClick;
    this.#handleFavoriteButtonClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onEventRollupButtonClick);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#onFavoriteButtonClick);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offersPoint, this.allDestinations);
  }

  #onEventRollupButtonClick = (evt) => {
    evt.preventDefault();
    this.#handlePointRollupButtonClick();
  };

  #onFavoriteButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteButtonClick();
  };
}
