import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { useAppSelector } from '../../hooks';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import leaflet from 'leaflet';
import { Icon } from 'leaflet';
import { Offer } from '../../types/offers';
import { AppRoute } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  // offerId?: number | null;
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

function Map({offers}:MapProps):JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const centerMapCoords = offers[0].city.location;
  const map = useMap(mapRef, centerMapCoords);
  const { pathname } = useLocation();
  const mapWrapperClassname = classNames('map', pathname === AppRoute.Root ? 'cities__map' : 'property__map');
  const offerId = useAppSelector((state) => state.selectedHotelId);

  useEffect(() => {
    let isMounted = true;

    if(map && isMounted) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          layer.remove();
        }
      });

      offers.forEach((offer) => {
        const { location } = offer;
        leaflet
          .marker({
            lat: location.latitude,
            lng: location.longitude,
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
  }, [map, offers, offerId, offers.length]);


  return (
    <section className={mapWrapperClassname} ref={mapRef} />
  );
}

export default Map;
