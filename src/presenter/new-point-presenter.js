import FormEditView from '../view/form-edit-view.js';
import { EditMode, UserAction, UpdateType } from '../const.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import { nanoid } from 'nanoid';

export default class NewPointPresenter {

  #eventListContainer = null;
  #formEditListComponent = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({ eventListContainer, onDataChange, onDestroy }) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#formEditListComponent !== null) {
      return;
    }

    this.#formEditListComponent = new FormEditView({
      editMode: EditMode.ADD,
      onFormSubmit: this.#handleFormSubmit,
      onCancelButtonClick: this.#handleCancelButtonClick,
    });

    render(this.#formEditListComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscapeKeydown);
  }

  destroy() {
    if (this.#formEditListComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#formEditListComponent);
    this.#formEditListComponent = null;

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
