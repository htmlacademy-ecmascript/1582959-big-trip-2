import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';

export default class MainPresenter {
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];
  #pointPresenters = new Map();

  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #noPointComponent = new NoPointView();

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

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      offers: this.#offersModel.getOffersByType(updatedPoint.type),
      destination: this.#destinationsModel.getDestinationById(updatedPoint.destination)
    });
  };

  #renderSort() {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, offers, destination) {
    const pointPresenter = new PointPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, offers, destination);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#eventListComponent.element);
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      const offersByType = this.#offersModel.getOffersByType(point.type);
      const destinationById = this.#destinationsModel.getDestinationById(point.destination);
      this.#renderPoint(point, offersByType, destinationById);
    });
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderComponent() {
    render(this.#eventListComponent, this.#container);

    if (this.#points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }
}
