import { render } from './framework/render.js';
import InfoTripPresenter from './presenter/info-trip-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './api/points-api-service.js';
import OffersApiService from './api/offers-api-service.js';
import DestinationsApiService from './api/destinations-api-service.js';

const AUTHORIZATION = 'Basic acsvw345465';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const tripMainContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

const mainPresenter = new MainPresenter({
  container: eventsContainer,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  newPointButtonComponent,
  onNewPointDestroy: handleNewPointFormClose
});

const infoTripPresenter = new InfoTripPresenter({
  tripMainContainer,
  pointsModel,
  offersModel,
  destinationsModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel,
  pointsModel
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  mainPresenter.createPoint(destinationsModel.destinations, offersModel.offers);

  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
mainPresenter.init();
infoTripPresenter.init();
Promise.all([destinationsModel.init(), offersModel.init()])
  .then(() => pointsModel.init())
  .finally(() => {
    render(newPointButtonComponent, tripMainContainer);
  });
