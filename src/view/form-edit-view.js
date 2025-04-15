import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { convertDate } from '../utils/main.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { POINT_TYPES, DateFormat } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEventTypesItemTemplate(pointType) {
  return POINT_TYPES
    .map((type) => (
      `
      <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${type === pointType ? 'checked' : ''}>
        <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
      </div>
    `
    ))
    .join('');
}

function createOffersTemplate(offersPoint, offers) {
  if (offersPoint.offers) {
    return ` <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersPoint.offers.map(({ title, price, id }) => (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="${id}" type="checkbox" name="${title}" ${offers.includes(id) ? 'checked' : ''}>
        <label class="event__offer-label" for="${id}">
          <span class="event__offer-title">${title}</span>
          +€&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
            </div>`)).join('')}
            </div>`;
  }
  return '';
}

function createDestinationTemplate(destination) {
  if (destination) {
    return (
      `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
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
              ${createEventTypesItemTemplate(type)}

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
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
      </header>
      <section class="event__details">
      <section class="event__section  event__section--offers">
          ${offersPoint.offers.length !== 0 ? createOffersTemplate(offersPoint, offers) : ''}
          </section>

          <section class="event__section  event__section--destination">
          ${destination.pictures.length !== 0 ? createDestinationTemplate(destination) : ''}
      </section>
      </section>
      </form>
  </li>
`;
}

export default class FormEditView extends AbstractStatefulView {
  #point = null;
  #destination = null;
  #offersPoint = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #handleResetButtonClick = null;

  constructor({ point, destination, offers, onFormSubmit, onRollupButtonClick, onResetButtonClick }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersPoint = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleResetButtonClick = onResetButtonClick;
    this._setState(FormEditView.parsePointToState(this.#point, this.#offersPoint.offers, this.#destination));
    this._restoreHandlers();
  }

  get template() {
    return createEventTemplate(this.#point, this.#destination, this.#offersPoint);
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#onFormSubmit);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onEventRollupButtonClick);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#onEventResetButtonClick);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#onTypeChange);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#onDestinationChange);

    this.#setDatepicker();
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditView.parseStateToPoint({
      ...this.#point
    }));
  };

  #onEventRollupButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #onEventResetButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleResetButtonClick();
  };

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offersPoint: Object.keys(this.#offersPoint).find((offer) => offer.type === evt.target.value),
    });
  };

  #onDestinationChange = (evt) => {
    evt.preventDefault();
    const selectedDestination = Object.keys(this.#destination).find((dest) => dest.name === evt.target.value);
    if (!selectedDestination) {
      return;
    }
    this.updateElement({
      description: selectedDestination.description,
      photos: selectedDestination.photos
    });
  };

  static parsePointToState = (point) => ({ ...point });

  static parseStateToPoint = (state) => ({ ...state });

  reset(point, offersPoint, destination) {
    this.updateElement(
      FormEditView.parsePointToState(point, offersPoint.offers, destination)
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom && this.#datepickerTo) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #onDateFromChange = ([userDate]) => {
    this.updateElement({ dateFrom: userDate });
  };

  #onDateToChange = ([userDate]) => {
    this.updateElement({ dateTo: userDate });
  };

  #setDatepicker() {
    const basicDateSettings = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
    };
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...basicDateSettings,
        defaultDate: this.#point.dateFrom,
        onChange: this.#onDateFromChange
      }
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...basicDateSettings,
        defaultDate: this.#point.dateTo,
        onChange: this.#onDateToChange
      }
    );
  }
}
