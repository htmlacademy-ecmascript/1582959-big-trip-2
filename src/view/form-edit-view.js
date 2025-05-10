import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { convertDate } from '../utils/main.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { POINT_TYPES, DateFormat } from '../const.js';
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

function createDestinationListTemplate(allDestinations) {
  const destinationNames = allDestinations.map((destination) => destination.name);

  return destinationNames.map((name) => `<option value="${name}">${name}</option>`).join('');
}

function createDestinationTemplate(allDestinations, state) {

  const foundDestination = allDestinations.find((destination) => destination.id === state.destination);

  const photos = foundDestination.pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}"/>`
  )).join('');

  if (foundDestination && foundDestination.pictures.length > 0 || foundDestination.description) {
    return `
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${foundDestination.description}</p>
      ${foundDestination.pictures.length === 0 ? '' : `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos}
        </div>
      </div>`}
  `;
  }
  return '';
}

function findDestinationName(allDestinations, state) {
  const foundDestination = allDestinations.find((destination) => destination.id === state.destination);

  if (foundDestination) {
    return foundDestination.name;
  }
}

function createEventTemplate(state) {
  const { basePrice, dateFrom, dateTo, type, offersPoint, offers, allDestinations, isDeleting, isSaving, isDisabled } = state;
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
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(findDestinationName(allDestinations, state))}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
          ${createDestinationListTemplate(allDestinations)}
          </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${parseInt(basePrice, 10)}" min="1" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
      <section class="event__section  event__section--offers">
      ${createOffersTemplate(offers, offersPoint)}
      </section>
          <section class="event__section  event__section--destination">
          ${createDestinationTemplate(allDestinations, state)}
      </section>
      </section>
      </form>
  </li>
`;
}

export default class FormEditView extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #destinationsModel = null;
  #offersPoint = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #handleDeleteButtonClick = null;

  constructor({ point, destinations, allDestinations, destinationsModel, offers, allOffers, onFormSubmit, onRollupButtonClick, onDeleteButtonClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#destinationsModel = destinationsModel;
    this.allDestinations = allDestinations;
    this.#offersPoint = offers;
    this.allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleDeleteButtonClick = onDeleteButtonClick;

    this._setState(FormEditView.parsePointToState(this.#point, this.#offersPoint.offers, this.#destinations, this.allDestinations));
    this._restoreHandlers();
  }

  get template() {
    return createEventTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#onFormSubmit);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#onFormDeleteButtonClick);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onEventRollupButtonClick);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#onTypeChange);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#onDestinationChange);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#onPriceChange);

    this.element.querySelector('.event__section--offers')
      .addEventListener('change', this.#onOffersButtonChange);

    this.#setDatepicker();
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    if (this._state.dateFrom <= this._state.dateTo) {
      this.#handleFormSubmit(FormEditView.parseStateToPoint({
        ...this._state,
        destinations: this._state.destination.id
      }));
    }
  };

  #onEventRollupButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #onFormDeleteButtonClick = (evt) => {
    evt.preventDefault();
    this.#handleDeleteButtonClick(FormEditView.parseStateToPoint(this._state));
  };

  #onPriceChange = (evt) => {
    this.updateElement({
      basePrice: +evt.target.value,
    });
  };

  #onTypeChange = (evt) => {
    evt.preventDefault();
    const typedOffers = this.allOffers.find((offer) => offer.type === evt.target.value);
    this.updateElement({
      type: evt.target.value,
      offersPoint: typedOffers === undefined ? [] : typedOffers.offers,
      offers: []
    });
  };

  #onDestinationChange = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.allDestinations.find((destination) => destination.name === evt.target.value);

    if (!selectedDestination) {
      return;
    }
    this.updateElement({
      destination: selectedDestination.id,
    });
  };

  #onOffersButtonChange = () => {
    const offersChecked = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this.updateElement({
      offers: offersChecked.map((offer) => offer.id)
    });
  };

  static parsePointToState = (point, offersPoint, destinations, allDestinations) =>
    ({
      ...point,
      offersPoint,
      destinations,
      allDestinations,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    });

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.isDeleting;
    delete point.isDisabled;
    delete point.isSaving;

    return point;
  }

  reset(point, offersPoint, destinations) {
    this.updateElement({
      ...FormEditView.parsePointToState(point, offersPoint.offers, destinations),
      allDestinations: this.#destinationsModel.destinations
    });
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
        onChange: this.#onDateFromChange,
      }
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...basicDateSettings,
        defaultDate: this._state.dateTo,
        onChange: this.#onDateToChange,
        minDate: this._state.dateFrom
      }
    );
  }
}
