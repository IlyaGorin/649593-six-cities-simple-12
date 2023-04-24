import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process.slice';
import { appData } from './app-data/app-data.slice';
import { selectedOfferData } from './selected-offer-data/selected-offer-data.slice';
import { offersData } from './offers-data/offers-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.App]: appData.reducer,
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.OfferData]: selectedOfferData.reducer
});
