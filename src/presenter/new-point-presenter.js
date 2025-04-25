import AddFormView from '../view/add-form-view.js';
import { UserAction, UpdateType } from '../const.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import { nanoid } from 'nanoid';

export default class NewPointPresenter {

  #eventListContainer = null;
  #addPointFormComponent = null;
  #offers = null;
  #destination = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({ eventListContainer, onDataChange, onDestroy }) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({ offers, destination }) {
    this.#offers = offers;
    this.#destination = destination;

    if (this.#addPointFormComponent !== null) {
      return;
    }

    this.#addPointFormComponent = new AddFormView({
      offers: this.#offers,
      destination: this.#destination,
      onFormSubmit: this.#handleFormSubmit,
      onCancelButtonClick: this.#handleCancelButtonClick,
    });

    render(this.#addPointFormComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscapeKeydown);
  }

  destroy() {
    if (this.#addPointFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addPointFormComponent);
    this.#addPointFormComponent = null;

    document.removeEventListener('keydown', this.#onEscapeKeydown);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
    this.destroy();
  };

  #handleCancelButtonClick = () => {
    this.destroy();
  };

  #onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
