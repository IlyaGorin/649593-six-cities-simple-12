import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offers';
import { calculateRating } from '../../utils/utils';
import { findFirstSentence } from '../../utils/utils';
import { setSelectedHotelId } from '../../store/selected-offer-data/selected-offer-data.slice';
import { useAppDispatch } from '../../hooks';

export type OfferCardProps = {
  offerData: Offer;
  isNearbyOfferCard?: boolean;
}

function OfferCard({offerData, isNearbyOfferCard}:OfferCardProps): JSX.Element {

  const cardClassName = classNames({
    'near-places': isNearbyOfferCard,
    'cities': !isNearbyOfferCard
  });

  const dispatch = useAppDispatch();

  return (
    <article className={classNames(`${cardClassName}__card place-card`)}
      onMouseEnter={()=> {
        dispatch(setSelectedHotelId(offerData.id));
      }}
      onMouseLeave={()=>{
        dispatch(setSelectedHotelId(null));
      }}
    >
      {offerData?.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={classNames(`${cardClassName}__image-wrapper place-card__image-wrapper`)}>
        <a>
          <img className="place-card__image" src={offerData.previewImage} width={260} height={200} alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offerData.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calculateRating(offerData.rating)}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`${AppRoute.Room}${offerData.id}`}
          >
            {findFirstSentence(offerData.title)}
          </Link>
        </h2>
        <p className="place-card__type">{offerData.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
