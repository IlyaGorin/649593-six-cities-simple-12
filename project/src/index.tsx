import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify';
import App from './components/app/app';
import { nearbyOffers } from './mocks/nearby-offers';
import { reviews } from './mocks/reviews';
import { store } from './store';
import { LocationName } from './const';
import { checkAuthAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App reviews={reviews} nearbyOffers={nearbyOffers} locationsNames={Object.values(LocationName)}/>
    </Provider>
  </React.StrictMode>,
);
