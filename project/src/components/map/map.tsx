import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import leaflet from 'leaflet';
import { Icon } from 'leaflet';
import { Offers } from '../../types/offers';
import { cityLocations, AppRoute } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers[];
  offerId?: number | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const aciveCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({offers, offerId}:MapProps):JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, cityLocations.amsterdam);
  const { pathname } = useLocation();
  const mapWrapperClassname = classNames('map', pathname === AppRoute.Root ? 'cities__map' : 'property__map');

  useEffect(() => {
    let isMounted = true;

    if(map && isMounted) {
      offers.forEach((offer) => {
        const {city} = offer;
        leaflet
          .marker({
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          {
            icon: (offerId === offer.id)
              ? aciveCustomIcon
              : defaultCustomIcon
          }).addTo(map);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [map, offers, offerId]);


  return (
    <section className={mapWrapperClassname} ref={mapRef} />
  );
}

export default Map;
