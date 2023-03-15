import { Offers } from '../../types/offers';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: Offers[];
}

function OffersList({offers}: OffersListProps):JSX.Element {
  return (
    <>
      {offers.map((offerData) => <OfferCard key={offerData.id} offerData={offerData}/>)}
    </>
  );
}

export default OffersList;
