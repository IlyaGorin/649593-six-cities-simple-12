import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offers';
import { AuthorizationStatus, AppRoute } from '../const';
import { UserData } from '../types/user-data';
import { Review } from '../types/reviews';

export const changeCity = createAction('offers/changeCity', (city:string) => ({payload: city}));

export const changeSortType = createAction('offers/changeSortType', (type:string) => ({payload: type}) );

export const loadOffers = createAction('offers/loadOfers', (offers:Offer[]) => ({ payload: offers }));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserData>('user/setUserData');

export const clearUserData = createAction<null>('user/clearUserData');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setSelectedHotelId = createAction('data/setSelectedHotelId', (id: number | null) => ({payload: id}));

export const setSelectedOffer = createAction('data/setSelectedOffer', (offer:Offer) => ({ payload: offer }));

export const setNearbyOffers = createAction<Offer[]>('data/setNearbyOffers');

export const setComments = createAction<Review[]>('data/setComments');
