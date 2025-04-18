import { remove, render, RenderPosition } from '../framework/render.js';
import FormEditView from '../view/form-edit-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #offers = null;
  #destination = null;

  #addEventComponent = null;

  constructor({ eventListContainer, onDataChange, onDestroy, offers, destination }) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#offers = offers;
    this.#destination = destination;
  }

  init() {
    if (this.#addEventComponent !== null) {
      return;
    }

    this.#addEventComponent = new FormEditView({
      offers: this.#offers,
      destinations: this.#destination,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteButtonClick: this.#handleDeleteButtonClick
    });

    render(this.#addEventComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscapeKeydown);
  }

  destroy() {
    if (this.#addEventComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addEventComponent);
    this.#addEventComponent = null;

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

  #handleDeleteButtonClick = () => {
    this.destroy();
  };

  #onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
