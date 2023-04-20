import { LocationNameType } from '../../const';
import { useAppSelector} from '../../hooks';
import { sortOffers } from '../../utils/utils';
import LocationsList from '../../components/locations-list/locations-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import OfferCard from '../../components/offer-card/offer-card';
import SortOption from '../../components/sort-option/sort-option';
import Spinner from '../../components/spinner/spinner';

type MainScreenProps = {
  locationsNames: LocationNameType;
}

function MainScreen({locationsNames}:MainScreenProps ): JSX.Element {
  const cityName = useAppSelector((state) => state.city);
  const sortType = useAppSelector((state) => state.sortType);
  const offers = useAppSelector((state) => state.offers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  const filteredOffers = offers.filter(({city})=> city.name === cityName);

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
            <SortOption />
            <div className="cities__places-list places__list tabs__content">
              {
                isOffersDataLoading === true ?
                  <Spinner /> :
                  <OffersList
                    offers={sortOffers(filteredOffers, sortType)}
                    OfferComponent={OfferCard}
                  />
              }
            </div>
          </section>
          <div className="cities__right-section">
            {
              offers.length > 0 && (
                <Map offers={filteredOffers} />
              )
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
