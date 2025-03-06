import { render } from './render.js';
import FilterView from './view/filter-view.js';
import InfoTripView from './view/info-trip-view.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({ container: eventsContainer });

render(new InfoTripView(), tripMainContainer);
render(new FilterView(), filtersContainer);

boardPresenter.init();
