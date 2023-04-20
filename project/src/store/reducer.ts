import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity, changeSortType, loadOffers,
  setOffersDataLoadingStatus, requireAuthorization,
  setUserData, clearUserData, setSelectedOffer, setSelectedHotelId,
  setNearbyOffers, setComments
} from './action';
import { Offer } from '../types/offers';
import { UserData } from '../types/user-data';
import { Review } from '../types/reviews';
import { SortType, AuthorizationStatus } from '../const';

type InitialStateType = {
  city: string;
  sortType: string;
  offers: Offer[];
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  selectedHotelId: number | null;
  selectedOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
}

const initialState:InitialStateType = {
  city: 'Paris',
  sortType: SortType.DEFAULT,
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  selectedHotelId: null,
  selectedOffer: null,
  nearbyOffers: [],
  comments: [],
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
    })
    .addCase(setSelectedHotelId, (state, action) => {
      state.selectedHotelId = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    });

});

export {reducer};
