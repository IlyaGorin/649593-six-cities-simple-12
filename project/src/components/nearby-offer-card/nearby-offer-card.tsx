import OfferCard from '../offer-card/offer-card';
import { OfferCardProps } from '../offer-card/offer-card';


type NearbyOfferCardProps = OfferCardProps;

function NearbyOfferCard(props:NearbyOfferCardProps):JSX.Element {
  return <OfferCard {...props}/>;
}

export default NearbyOfferCard;
