import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offers';
import { Review } from '../types/reviews';
import { CommentData } from '../types/reviews';
import { APIRoute } from '../const';
import { saveToken, dropToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api}) => {
    const { data } = await api.get<Offer[]>(APIRoute.Hotels);
    return data;
  },
);

export const fetchOfferDataAction = createAsyncThunk<
  { offer: Offer; nearbyOffers: Offer[]; comments: Review[] },
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchOfferData',
  async (id, { extra: api }) => {
    const [offerResponse, nearbyOffersResponse, commentsResponse] = await Promise.all([
      api.get<Offer>(`${APIRoute.Hotels}/${id}`),
      api.get<Offer[]>(`${APIRoute.Hotels}/${id}/nearby`),
      api.get<Review[]>(`${APIRoute.Comments}/${id}`),
    ]);
    return {
      offer: offerResponse.data,
      nearbyOffers: nearbyOffersResponse.data,
      comments: commentsResponse.data,
    };
  },
);


export const checkAuthAction = createAsyncThunk<UserData | undefined, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api}) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, { extra: api}) => {
    const {data: {token}, data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<null, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    return null;
  },
);

export const postCommentAction = createAsyncThunk<Review[], { comment: CommentData; id: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comment/postComment',
  async ({comment, id}, { extra: api}) => {
    const response = await api.post<Review[]>(
      `${APIRoute.Comments}/${id}`,
      comment,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  },
);
