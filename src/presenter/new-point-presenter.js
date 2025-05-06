import AddFormView from '../view/add-form-view.js';
import { UserAction, UpdateType } from '../const.js';
import { RenderPosition, render, remove } from '../framework/render.js';

export default class NewPointPresenter {

  #eventListContainer = null;
  #addPointFormComponent = null;
  #offersModel = null;
  #destinationsModel = null;
  #destinations = null;
  #offers = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({ eventListContainer, offersModel, destinationsModel, onDataChange, onDestroy }) {
    this.#eventListContainer = eventListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({ destinations, offers }) {
    this.#destinations = destinations;
    this.#offers = offers;
    if (this.#addPointFormComponent !== null) {
      return;
    }

    const allOffers = this.#offersModel.offers;

    this.#addPointFormComponent = new AddFormView({
      offers: this.#offersModel.getOffersByType('flight'),
      destinations: this.#destinations,
      allOffers: allOffers,
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

  setSaving() {
    this.#addPointFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#addPointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#addPointFormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
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
