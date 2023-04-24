import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {ToastContainer} from 'react-toastify';
import App from './components/app/app';
import { store } from './store';
import { LocationName } from './const';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App locationsNames={Object.values(LocationName)}/>
    </Provider>
  </React.StrictMode>,
);
