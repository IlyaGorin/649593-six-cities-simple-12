import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offers';

export const changeCity = createAction('changeCity', (city:string) => ({payload: city}));
export const changeSortType = createAction('changeSortType', (type:string) => ({payload: type}) );
export const loadOffers = createAction('loadOfers', (offers:Offers[]) => ({ payload: offers }));
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
