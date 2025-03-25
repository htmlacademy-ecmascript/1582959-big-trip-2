import AbstractView from '../framework/view/abstract-view.js';
import { convertDate } from '../utils/main.js';
import { POINT_TYPES, DateFormat } from '../const.js';

function createEventTypeItem(type) {
  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>
  `;
}

function createEventTypesItemTemplate() {
  return POINT_TYPES
    .map((type) => createEventTypeItem(type))
    .join('');
}

function createOffersTemplate(offersPoint, offers) {
  if (offersPoint.offers) {
    return offersPoint.offers.map(({ title, price, id }) => (
      ` <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="${id}" type="checkbox" name="${title}" ${offers.includes(id) ? 'checked' : ''}>
        <label class="event__offer-label" for="${id}">
          <span class="event__offer-title">${title}</span>
          +€&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`)).join('');
  }
  return '';
}

function createDestinationTemplate(destination) {
  if (destination) {
    return (
      `<div class="event__photos-container">
            <div class="event__photos-tape">
            ${destination.pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}"></img>`).join('')}
            </div>
          </div>`
    );
  }
  return '';
}

function createEventTemplate(point, destination, offersPoint) {
  const { basePrice, dateFrom, dateTo, type, offers } = point;

  const dateStart = convertDate(dateFrom, DateFormat.DAY_TIME);
  const dateEnd = convertDate(dateTo, DateFormat.DAY_TIME);

  return `
  <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
      <header class="event__header">
          <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
              <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventTypesItemTemplate()}

              </fieldset>
          </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
          </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
      </header>
      <section class="event__details">
          <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
             ${createOffersTemplate(offersPoint, offers)}
          </div>
          </section>

          <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>

          ${createDestinationTemplate(destination)}
          </section>
      </section>
      </form>
  </li>
`;
}

export default class FormEditView extends AbstractView {

  #point = null;
  #destination = null;
  #offersPoint = null;
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;

  constructor({ point, destination, offers, onFormSubmit, onRollupButtonClick }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersPoint = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;

    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#onFormSubmit);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onEventRollupButtonClick);
  }

  get template() {
    return createEventTemplate(this.#point, this.#destination, this.#offersPoint);
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #onEventRollupButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };
}
