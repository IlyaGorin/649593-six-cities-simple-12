import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offers';
import { fetchOfferDataAction, postCommentAction } from '../api-actions';
import { Review } from '../../types/reviews';

export type selectedOfferData = {
  selectedHotelId: number | null;
  selectedOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
};

const initialState: selectedOfferData = {
  selectedHotelId: null,
  selectedOffer: null,
  nearbyOffers: [],
  comments: [],
};

export const selectedOfferData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setSelectedOffer: (state, action: PayloadAction<Offer>) => {
      state.selectedOffer = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<Offer[]>) => {
      state.nearbyOffers = action.payload;
    },
    setSelectedHotelId: (state, action: PayloadAction<number | null>) => {
      state.selectedHotelId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.
      addCase(fetchOfferDataAction.fulfilled, (state, action: PayloadAction<{ offer: Offer; nearbyOffers: Offer[]; comments: Review[] }>) => {
        const { offer, nearbyOffers, comments } = action.payload;
        state.selectedOffer = offer;
        state.nearbyOffers = nearbyOffers;
        state.comments = comments;
      })
      .addCase(postCommentAction.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.comments = action.payload;
      });
  },
});

export const { setSelectedOffer, setNearbyOffers, setSelectedHotelId } = selectedOfferData.actions;
