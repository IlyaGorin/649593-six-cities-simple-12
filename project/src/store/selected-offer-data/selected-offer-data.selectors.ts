import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offers';
import { Review } from '../../types/reviews';

export const getSelectedHotelId = (state: State): number | null => state[NameSpace.OfferData].selectedHotelId;
export const getSelectedOffer = (state: State): Offer | null => state[NameSpace.OfferData].selectedOffer;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.OfferData].nearbyOffers;
export const getComments = (state: State): Review[] => state[NameSpace.OfferData].comments;

