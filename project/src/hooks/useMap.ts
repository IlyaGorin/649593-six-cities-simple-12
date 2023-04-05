import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import { CityLocation } from '../types/offers';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityLocation
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current);
      const layer = new TileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      );

      instance.addLayer(layer);
      instance.setView([city.latitude, city.longitude], city.zoom);

      if(isMounted) {
        setMap(instance);
      }

      isRenderedRef.current = true;

      return () => {
        isMounted = false;
      };
    }

    if (map !== null) {
      map.flyTo([city.latitude, city.longitude], city.zoom, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }

  }, [mapRef, city.latitude, city.longitude, city.zoom, city]);

  return map;
}

export default useMap;
