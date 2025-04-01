import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { sortByPrice, sortByTime } from '../utils/main.js';
import { SortType } from '../const.js';

export default class MainPresenter {
  #container = null;
  #filterContainer = document.querySelector('.trip-controls__filters');

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  #sortComponent = null;
  #filterComponent = null;
  #eventListComponent = new EventListView();
  #noPointComponent = new NoPointView();

  constructor({ container, pointsModel, offersModel, destinationsModel, filters }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterComponent = new FilterView({ filters });
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];

    this.#renderComponent();
    this.#renderFilter();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      offers: this.#offersModel.getOffersByType(updatedPoint.type),
      destination: this.#destinationsModel.getDestinationById(updatedPoint.destination)
    });
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#points = [...sortByPrice(this.#points)];
        break;
      case SortType.TIME:
        this.#points = [...sortByTime(this.#points)];
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    render(this.#filterComponent, this.#filterContainer);
  }

  #renderPoint(point, offers, destination) {
    const pointPresenter = new PointPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init({ point, offers, destination });
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
