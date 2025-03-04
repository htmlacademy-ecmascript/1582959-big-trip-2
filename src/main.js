import { render } from './render.js';
import FilterView from './view/filter-view.js';
import InfoTripView from './view/info-trip-view.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter({boardContainer: tripMainContainer});

render(new FilterView(), filtersContainer);
render(new InfoTripView(), tripMainContainer);

boardPresenter.init();
