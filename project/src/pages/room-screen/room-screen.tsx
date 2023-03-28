import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Offers } from '../../types/offers';
import { Review } from '../../types/reviews';
import { findFirstSentence } from '../../utils/utils';
import { calculateRating } from '../../utils/utils';
import CommentForm from '../../components/comment-form/comment-form';
import NearbyOfferCard from '../../components/nearby-offer-card/nearby-offer-card';
import OffersList from '../../components/offers-list/offers-list';
import ReviewsList from '../../components/reviews-list/reviews-list';

type RoomScreenProps = {
  offers: Offers[];
  nearbyOffers: Offers[];
  reviews: Review[];
}

const IMAGES_COUNT = 6;

function RoomScreen({ offers, reviews, nearbyOffers }:RoomScreenProps): JSX.Element {
  const { id } = useParams();
  //TODO оптимизировать
  const necessaryOffer = offers.find((offer)=> offer.id === Number(id))!;
  const images:string[] = necessaryOffer ? necessaryOffer.images.slice(0, IMAGES_COUNT) : [];

  return (
    <>
      <Helmet>
        <title>six cities simple: property</title>
      </Helmet>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images ? images.map((image:string)=> (
                  <div className="property__image-wrapper" key={image}>
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>
                )) : ''
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {necessaryOffer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {necessaryOffer ? findFirstSentence(necessaryOffer.description) : ''}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${calculateRating(necessaryOffer.rating)}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{necessaryOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {necessaryOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {necessaryOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {necessaryOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{necessaryOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {necessaryOffer.goods.map((good)=>(
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                Angelina
                  </span>
                  <span className="property__user-status">
                Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="property__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList offers={nearbyOffers} OfferComponent={(props) => <NearbyOfferCard {...props} isNearbyOfferCard/>}/>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default RoomScreen;
