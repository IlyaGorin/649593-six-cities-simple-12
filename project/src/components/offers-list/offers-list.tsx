import { useMemo } from 'react';
import { Offer } from '../../types/offers';

type OffersListProps<T extends Offer> = {
  offers: T[];
  offerIdChangeHandler?: (id: number | null) => void;
  OfferComponent: React.ComponentType<{offerData: T; offerIdChangeHandler?: (id: number | null) => void}>;
}

function OffersList<T extends Offer>({ offers, offerIdChangeHandler, OfferComponent }: OffersListProps<T>): JSX.Element {
  const offersList = useMemo(
    () => (
      <>
        {offers.map((offerData) => (
          <OfferComponent key={offerData.id} offerData={offerData} offerIdChangeHandler={offerIdChangeHandler} />
        ))}
      </>
    ), [offers, offerIdChangeHandler, OfferComponent]);

  return offersList;
}

export default OffersList;
