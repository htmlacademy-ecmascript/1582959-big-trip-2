import EventListView from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);
    render(new FormEditView({
      point: this.points[0],
      offers: this.offersModel.getOffersByType(this.points[0].type),
      destination: this.destinationsModel.getDestinationById(this.points[0].destination)
    }), this.eventListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView({
        point: this.points[i],
        offers: this.offersModel.getOffersByType(this.points[i].type),
        destination: this.destinationsModel.getDestinationById(this.points[i].destination)
      }), this.eventListComponent.getElement());
    }
  }
}
