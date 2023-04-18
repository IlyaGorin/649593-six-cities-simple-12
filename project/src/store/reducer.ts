import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, loadOffers, setOffersDataLoadingStatus, requireAuthorization, setUserData, clearUserData} from './action';
import { Offers } from '../types/offers';
import { UserData } from '../types/user-data';
import { SortType, AuthorizationStatus } from '../const';

const initialState = {
  city: 'Paris',
  sortType: SortType.DEFAULT as string,
  offers: [] as Offers[],
  isOffersDataLoading: false as boolean,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null as UserData | null,
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(clearUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {reducer};
