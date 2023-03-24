import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offers } from '../../types/offers';
import { calculateRating } from '../../utils/utils';
import { findFirstSentence } from '../../utils/utils';

type OfferCardProps = {
  offerData: Offers;
  offerIdChangeHandler: (id: number|null) => void;
}

function OfferCard({offerData, offerIdChangeHandler}:OfferCardProps): JSX.Element {
  const [offerId, setOfferId] = useState< number | null>(null);

  useEffect(() => {
    offerIdChangeHandler(offerId);
  }, [offerId]);

  return (
    <article className="cities__card place-card"
      onMouseEnter={()=> {
        setOfferId(offerData.id,);
      }}
      onMouseLeave={()=>{
        setOfferId(null);
      }}
    >
      {offerData?.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
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
          <Link to={`${AppRoute.Room}${offerData.id}`}>{findFirstSentence(offerData.description)}</Link>
        </h2>
        <p className="place-card__type">{offerData.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
