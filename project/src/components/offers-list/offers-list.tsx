import { Offers } from '../../types/offers';

type OffersListProps<T extends Offers> = {
  offers: T[];
  offerIdChangeHandler?: (id: number | null) => void;
  OfferComponent: React.ComponentType<{offerData: T; offerIdChangeHandler?: (id: number | null) => void}>;
}

function OffersList<T extends Offers>({ offers, offerIdChangeHandler, OfferComponent }: OffersListProps<T>): JSX.Element {
  return (
    <>
      {offers.map((offerData) => (
        <OfferComponent key={offerData.id} offerData={offerData} offerIdChangeHandler={offerIdChangeHandler} />
      ))}
    </>
  );
}

export default OffersList;
