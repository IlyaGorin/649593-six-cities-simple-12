import { useState } from 'react';
import { Offers } from '../../types/offers';
import { LocationNameType } from '../../const';
import { useAppSelector } from '../../hooks';
import LocationsList from '../../components/locations-list/locations-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import OfferCard from '../../components/offer-card/offer-card';

type MainScreenProps = {
  offers: Offers[];
  locationsNames: LocationNameType;
}

function MainScreen({offers, locationsNames}:MainScreenProps ): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<number| null>(null);

  const cityName = useAppSelector((state) => state.city);

  const filteredOffers = offers.filter(({city})=> city.name === cityName);

  function offerIdChangeHandler(newState:number|null) {
    setActiveOfferId(newState);
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <LocationsList locationsNames={locationsNames} />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{filteredOffers.length} places to stay in {cityName}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
            Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList offers={filteredOffers} offerIdChangeHandler={offerIdChangeHandler} OfferComponent={OfferCard}/>
            </div>
          </section>
          <div className="cities__right-section">
            <Map offers={filteredOffers} offerId={activeOfferId} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
