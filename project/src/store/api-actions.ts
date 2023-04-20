import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { Offer } from '../types/offers';
import { Review } from '../types/reviews';
import { CommentData } from '../types/reviews';
import {
  loadOffers, setOffersDataLoadingStatus, requireAuthorization,
  setUserData, clearUserData, setSelectedOffer, setNearbyOffers,
  setComments
} from './action';
import { AuthorizationStatus, AppRoute, APIRoute } from '../const';
import { saveToken, dropToken } from '../services/token';
import { redirectToRoute } from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Hotels);
    dispatch(loadOffers(data));
    dispatch(setOffersDataLoadingStatus(false));
  },
);

export const fetchOfferDataAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferData',
  async (id, { dispatch, extra: api }) => {
    const [offerResponse, nearbyOffersResponse, commentsResponse] = await Promise.all([
      api.get<Offer>(`${APIRoute.Hotels}/${id}`),
      api.get<Offer[]>(`${APIRoute.Hotels}/${id}/nearby`),
      api.get<Review[]>(`${APIRoute.Comments}/${id}`),
    ]);
    dispatch(setSelectedOffer(offerResponse.data));
    dispatch(setNearbyOffers(nearbyOffersResponse.data));
    dispatch(setComments(commentsResponse.data));
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error){
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}, data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dispatch(clearUserData(null));
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const postCommentAction = createAsyncThunk<void, { comment: CommentData; id: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comment/postComment',
  async ({comment, id}, {dispatch, extra: api}) => {
    const response = await api.post<Review[]>(
      `${APIRoute.Comments}/${id}`,
      comment,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    dispatch(setComments(response.data));
  },
);
