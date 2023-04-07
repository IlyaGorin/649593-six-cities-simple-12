import { createReducer } from '@reduxjs/toolkit';
import { fillOffersList, changeCity, changeSortType } from './action';
import { Offers } from '../types/offers';
import { SortType } from '../const';

const initialState = {
  city: 'Paris',
  offersList: [] as Offers[],
  sortType: SortType.DEFAULT as string,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffersList, (state, action) => {
      state.offersList = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    });
});

export {reducer};
