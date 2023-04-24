import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offers';
import { fetchOffersAction } from '../api-actions';

export type offersData = {
  offers: Offer[];
  isOffersDataLoading: boolean;
  hasErorr: boolean;
};

const initialState:offersData = {
  offers: [],
  isOffersDataLoading: false,
  hasErorr: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasErorr = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
        state.hasErorr = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasErorr = true;
      });
  }
});
