import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { convertDate } from '../utils/main.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { POINT_TYPES, DateFormat, EditMode } from '../const.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';
import he from 'he';
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

function createOffersTemplate(offers, offersPoint = []) {
  if (offersPoint.length) {
    return ` <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offersPoint.map(({ title, price, id }) => (
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

function createButtonNegativeTemplate(editMode, isDisabled, isDeleting) {
  return (
    editMode === EditMode.ADD
      ? `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>`
      : `<button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
  );
}

function createEventTemplate(point, editMode) {
  const { basePrice, dateFrom, dateTo, type, offers, offersPoint, destination, isDisabled, isDeleting } = point;
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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1">
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
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          ${createButtonNegativeTemplate(editMode, isDisabled, isDeleting)}
      </header>
      <section class="event__details">
      <section class="event__section  event__section--offers">
      ${offersPoint.length !== 0 ? createOffersTemplate(offers, offersPoint) : ''}
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
  #editMode = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #handleDeleteButtonClick = null;
  #handleCancelButtonClick = null;

  constructor({ point, destination, offers, editMode, onFormSubmit, onRollupButtonClick, onDeleteButtonClick, onCancelButtonClick }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersPoint = offers;
    this.#editMode = editMode;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleDeleteButtonClick = onDeleteButtonClick;
    this.#handleCancelButtonClick = onCancelButtonClick;

    this._setState(FormEditView.parsePointToState(this.#point, this.#offersPoint.offers, this.#destination));
    this._restoreHandlers();
  }

  get template() {
    return createEventTemplate(this._state, this.#editMode);
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#onFormSubmit);

    if (this.#editMode === EditMode.ADD) {
      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#onFormCancelButtonClick);
    }

    if (this.#editMode === EditMode.EDIT) {
      this.element.querySelector('.event__reset-btn')
        .addEventListener('click', this.#onFormDeleteButtonClick);

      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#onEventRollupButtonClick);
    }

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#onTypeChange);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#onDestinationChange);

    this.#setDatepicker();
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEditView.parseStateToPoint({
      ...this._state,
      offers: this._state.offersPoint.map((offer) => offer.id),
      destination: this._state.destination.id
    }));
  };

  #onEventRollupButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #onFormDeleteButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleDeleteButtonClick(FormEditView.parseStateToPoint(this._state));
  };

  #onFormCancelButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleCancelButtonClick();
  };

  #onTypeChange = (evt) => {
    evt.preventDefault();
    const typedOffers = mockOffers.find((offer) => offer.type === evt.target.value);
    this.updateElement({
      type: evt.target.value,
      offersPoint: typedOffers === undefined ? [] : typedOffers.offers,
      offers: []
    });
  };

  #onDestinationChange = (evt) => {
    evt.preventDefault();
    const selectedDestination = mockDestinations.find((destination) => destination.name === evt.target.value);
    if (!selectedDestination) {
      return;
    }
    this.updateElement({
      destination: selectedDestination,
    });
  };

  static parsePointToState = (point, offersPoint, destination) => ({ ...point, offersPoint, destination, isDisabled: false, isDeleting: false });

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
        defaultDate: this._state.dateFrom,
        onChange: this.#onDateFromChange
      }
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...basicDateSettings,
        defaultDate: this._state.dateTo,
        onChange: this.#onDateToChange
      }
    );
  }
}
