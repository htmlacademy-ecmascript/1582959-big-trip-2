import { render, RenderPosition } from './framework/render.js';
import InfoTripView from './view/info-trip-view.js';
import NewPointButtonView from './view/new-point-button-view.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinatonsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const destinationsModel = new DestinatonsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  container: eventsContainer,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  mainPresenter.createPoint(offersModel.offers, destinationsModel.destinations);
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripMainContainer);

render(new InfoTripView(), tripMainContainer, RenderPosition.AFTERBEGIN);

filterPresenter.init();
mainPresenter.init();
