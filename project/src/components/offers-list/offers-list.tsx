import { Offer } from '../../types/offers';

type OffersListProps<T extends Offer> = {
  offers: T[];
  offerIdChangeHandler?: (id: number | null) => void;
  OfferComponent: React.ComponentType<{offerData: T; offerIdChangeHandler?: (id: number | null) => void}>;
}

function OffersList<T extends Offer>({ offers, offerIdChangeHandler, OfferComponent }: OffersListProps<T>): JSX.Element {
  return (
    <>
      {offers.map((offerData) => (
        <OfferComponent key={offerData.id} offerData={offerData} offerIdChangeHandler={offerIdChangeHandler} />
      ))}
    </>
  );
}

export default OffersList;
