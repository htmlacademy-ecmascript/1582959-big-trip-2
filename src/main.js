import { render, RenderPosition } from './framework/render.js';
import FilterView from './view/filter-view.js';
import InfoTripView from './view/info-trip-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import DestinatonsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinatonsModel();
const offersModel = new OffersModel();
const boardPresenter = new BoardPresenter({
  container: eventsContainer,
  pointsModel,
  destinationsModel,
  offersModel
});

render(new InfoTripView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersContainer);

boardPresenter.init();
