import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { findFirstSentence } from '../../utils/utils';
import { calculateRating } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchOfferDataAction } from '../../store/api-actions';
import CommentForm from '../../components/comment-form/comment-form';
import Spinner from '../../components/spinner/spinner';
import Map from '../../components/map/map';
import NearbyOfferCard from '../../components/nearby-offer-card/nearby-offer-card';
import OffersList from '../../components/offers-list/offers-list';
import ReviewsList from '../../components/reviews-list/reviews-list';
import './room-screen.css';
import { setSelectedHotelId } from '../../store/selected-offer-data/selected-offer-data.slice';
import { getSelectedOffer, getNearbyOffers, getComments } from '../../store/selected-offer-data/selected-offer-data.selectors';
import { getAuthCheckedStatus } from '../../store/user-process/user-process.selectors';

const IMAGES_COUNT = 6;

function RoomScreen(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(id !== undefined) {
      dispatch(fetchOfferDataAction(id));
      dispatch(setSelectedHotelId(Number(id)));
    }
  }, [dispatch, id]);

  const selectedOffer = useAppSelector(getSelectedOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const comments = useAppSelector(getComments);
  const authorizationStatus = useAppSelector(getAuthCheckedStatus);

  if (!selectedOffer) {
    return (
      <div className='spinner-wrapper'>
        <Spinner />
      </div>
    );
  }

  const images:string[] = selectedOffer ? selectedOffer.images.slice(0, IMAGES_COUNT) : [];
  const { host } = selectedOffer;

  const offersForRender = [selectedOffer, ...nearbyOffers];

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
              {selectedOffer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {selectedOffer ? findFirstSentence(selectedOffer.title) : ''}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${calculateRating(selectedOffer.rating)}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{selectedOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {selectedOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {selectedOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {selectedOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{selectedOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {selectedOffer.goods.map((good)=>(
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
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width={74} height={74} alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  <span className="property__user-status">
                    {host.isPro ? 'pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {selectedOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">

                <ReviewsList reviews={comments}/>
                {authorizationStatus ? <CommentForm /> : ''}
              </section>
            </div>
          </div>
          <Map offers={offersForRender}/>
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
