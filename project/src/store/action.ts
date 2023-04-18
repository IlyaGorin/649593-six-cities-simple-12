import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offers';
import { AuthorizationStatus, AppRoute } from '../const';
import { UserData } from '../types/user-data';

export const changeCity = createAction('changeCity', (city:string) => ({payload: city}));

export const changeSortType = createAction('changeSortType', (type:string) => ({payload: type}) );

export const loadOffers = createAction('loadOfers', (offers:Offers[]) => ({ payload: offers }));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserData>('user/setUserData');

export const clearUserData = createAction<null>('user/clearUserData');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
