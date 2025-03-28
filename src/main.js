import { render, RenderPosition } from './framework/render.js';
import FilterView from './view/filter-view.js';
import { generateFilter } from './mock/filter.js';
import InfoTripView from './view/info-trip-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import DestinatonsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinatonsModel();
const offersModel = new OffersModel();
const mainPresenter = new MainPresenter({
  container: eventsContainer,
  pointsModel,
  destinationsModel,
  offersModel
});

render(new InfoTripView(), tripMainContainer, RenderPosition.AFTERBEGIN);
const filters = generateFilter(pointsModel.points);
render(new FilterView({ filters }), filtersContainer);

mainPresenter.init();
