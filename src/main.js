import { render, RenderPosition } from './framework/render.js';
import { generateFilter } from './mock/filter.js';
import InfoTripView from './view/info-trip-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import DestinatonsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinatonsModel();
const offersModel = new OffersModel();
const filters = generateFilter(pointsModel.points);

const mainPresenter = new MainPresenter({
  container: eventsContainer,
  pointsModel,
  destinationsModel,
  offersModel,
  filters
});

render(new InfoTripView(), tripMainContainer, RenderPosition.AFTERBEGIN);

mainPresenter.init();
