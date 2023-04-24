import classNames from 'classnames';
import { LocationNameType } from '../../const';
import { useAppSelector} from '../../hooks';
import { sortOffers } from '../../utils/utils';
import { getCityName, getSortType } from '../../store/app-data/app-data.selectors';
import { getOffersData, getOffersLoadingStaus, getOffersErorrStatus } from '../../store/offers-data/offers-data.selectors';
import LocationsList from '../../components/locations-list/locations-list';
import Map from '../../components/map/map';
import NoOffersScreen from '../../components/no-offers-screen/no-offers-screen';
import OffersList from '../../components/offers-list/offers-list';
import OfferCard from '../../components/offer-card/offer-card';
import SortOption from '../../components/sort-option/sort-option';
import Spinner from '../../components/spinner/spinner';

type MainScreenProps = {
  locationsNames: LocationNameType;
}

function MainScreen({locationsNames}:MainScreenProps ): JSX.Element {
  const cityName = useAppSelector(getCityName);
  const sortType = useAppSelector(getSortType);
  const offers = useAppSelector(getOffersData);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStaus);
  const hasErorr = useAppSelector(getOffersErorrStatus);

  const filteredOffers = offers.filter(({city})=> city.name === cityName);

  const mainPageClassName = classNames('page__main page__main--index', {
    'page__main--index-empty': hasErorr
  });

  return (
    <main className={mainPageClassName}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <LocationsList locationsNames={locationsNames} />
        </section>
      </div>
      {
        hasErorr ? <NoOffersScreen />
          :
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
      }


    </main>
  );
}

export default MainScreen;
