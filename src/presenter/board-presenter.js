import EventListView from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, replace } from '../framework/render.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];

  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    this.#renderComponent();
  }

  #renderPoint(point, offers, destination) {

    const onEscapeKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormEditToPoint();
        document.removeEventListener('keydown', onEscapeKeydown);
      }
    };

    const pointList = new PointView({
      point, offers, destination,
      onRollupButtonClick: () => {
        replacePointToFormEdit();
        document.addEventListener('keydown', onEscapeKeydown);
      }
    });

    const formEditList = new FormEditView({
      point, offers, destination,
      onFormSubmit: () => {
        replaceFormEditToPoint();
        document.removeEventListener('keydown', onEscapeKeydown);
      },
      onRollupButtonClick: () => {
        replaceFormEditToPoint();
        document.removeEventListener('keydown', onEscapeKeydown);
      }
    });

    function replacePointToFormEdit() {
      replace(formEditList, pointList);
    }

    function replaceFormEditToPoint() {
      replace(pointList, formEditList);
    }

    render(pointList, this.#eventListComponent.element);
  }

  #renderComponent() {
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    if (this.#points.length === 0) {
      render(new NoPointView(), this.#eventListComponent.element);
      return;
    }

    for (let i = 0; i < this.#points.length; i++) {
      const offersByType = this.#offersModel.getOffersByType(this.#points[i].type);
      const destinationById = this.#destinationsModel.getDestinationById(this.#points[i].destination);
      this.#renderPoint(this.#points[i], offersByType, destinationById);
    }
  }
}
