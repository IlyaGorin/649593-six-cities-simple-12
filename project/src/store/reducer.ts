import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, loadOffers, setOffersDataLoadingStatus } from './action';
import { Offers } from '../types/offers';
import { SortType } from '../const';

const initialState = {
  city: 'Paris',
  sortType: SortType.DEFAULT as string,
  offers: [] as Offers[],
  isOffersDataLoading: false as boolean,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export {reducer};
