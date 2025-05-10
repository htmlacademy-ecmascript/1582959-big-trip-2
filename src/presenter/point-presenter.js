import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import { render, replace, remove } from '../framework/render.js';
import { Mode, UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/main.js';

export default class PointPresenter {

  #eventListContainer = null;
  #point = null;
  #offers = null;
  #offersModel = null;
  #destinations = null;
  #destinationsModel = null;
  #pointListComponent = null;
  #formEditListComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ eventListContainer, offersModel, destinationsModel, onDataChange, onModeChange }) {
    this.#eventListContainer = eventListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({ point, offers, destinations }) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointListComponent = this.#pointListComponent;
    const prevFormEditListComponent = this.#formEditListComponent;
    const allOffers = this.#offersModel.offers;
    const allDestinations = this.#destinationsModel.destinations;

    this.#pointListComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      allDestinations: allDestinations,
      onRollupButtonClick: this.#handlePointRollupButtonClick,
      onFavoriteClick: this.#handleFavoriteButtonClick,
    });

    this.#formEditListComponent = new FormEditView({
      point: this.#point,
      offers: this.#offers,
      allOffers: allOffers,
      allDestinations: allDestinations,
      destinationsModel: this.#destinationsModel,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onRollupButtonClick: this.#handleRollupButtonClick,
      onDeleteButtonClick: this.#handleDeleteButtonClick,
    });

    if (prevPointListComponent === null || prevFormEditListComponent === null) {
      render(this.#pointListComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointListComponent, prevPointListComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointListComponent, prevFormEditListComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointListComponent);
    remove(prevFormEditListComponent);
  }

  destroy() {
    remove(this.#pointListComponent);
    remove(this.#formEditListComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#formEditListComponent.reset(this.#point, this.#offers, this.#destinations);
      this.#replaceFormEditToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#formEditListComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#formEditListComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointListComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#formEditListComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formEditListComponent.shake(resetFormState);
  }

  #replacePointToFormEdit() {
    replace(this.#formEditListComponent, this.#pointListComponent);
    document.addEventListener('keydown', this.#onEscapeKeydown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormEditToPoint() {
    replace(this.#pointListComponent, this.#formEditListComponent);
    document.removeEventListener('keydown', this.#onEscapeKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (this.#mode !== Mode.DEFAULT) {
        this.#formEditListComponent.reset(this.#point, this.#offers, this.#destinations);
        this.#replaceFormEditToPoint();
      }
    }
  };

  #handlePointRollupButtonClick = () => {
    this.#replacePointToFormEdit();
  };

  #handleRollupButtonClick = () => {
    this.#formEditListComponent.reset(this.#point, this.#offers, this.#destinations);
    this.#replaceFormEditToPoint();
  };

  #handleDeleteButtonClick = () => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      { ...this.#point }
    );
  };

  #handleFormSubmit = (point) => {
    const isMinorUpdate = !isDatesEqual(this.#point.dueDate, point.dueDate);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      point
    );
  };

  #handleFavoriteButtonClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  };
}
