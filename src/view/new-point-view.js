import AbstractView from '../framework/view/abstract-view.js';

function createNewPointTemplate() {
  return `
<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
`;
}

export default class NewPointView extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#onNewEventClick);
  }

  get template() {
    return createNewPointTemplate();
  }

  setDisabled(isDisabled) {
    this.element.disabled = isDisabled;
  }

  #onNewEventClick = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
