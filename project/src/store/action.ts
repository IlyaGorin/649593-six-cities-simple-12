import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offers';

export const changeCity = createAction('changeCity', (city:string) => ({payload: city}));
export const fillOffersList = createAction('fillOffersList', (offers:Offers[]) => ({ payload: offers }));

