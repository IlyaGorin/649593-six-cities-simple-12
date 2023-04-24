import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offers';

export const getOffersData = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getOffersLoadingStaus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getOffersErorrStatus = (state: State): boolean => state[NameSpace.Data].hasErorr;
