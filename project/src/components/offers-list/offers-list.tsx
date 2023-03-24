import { Offers } from '../../types/offers';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offers[];
  offerIdChangeHandler: (id: number|null) => void;
}

function OffersList({offers, offerIdChangeHandler}: OffersListProps):JSX.Element {
  return (
    <>
      {offers.map((offerData) => <OfferCard key={offerData.id} offerData={offerData} offerIdChangeHandler={offerIdChangeHandler}/>)}
    </>
  );
}

export default OffersList;
