import { createReducer } from '@reduxjs/toolkit';
import { fillOffersList, changeCity } from './action';
import { Offers } from '../types/offers';

const initialState = {
  city: 'Paris',
  offersList: [] as Offers[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffersList, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export {reducer};
