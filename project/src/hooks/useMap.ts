import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';


export type City = {
  lat: number;
  lng: number;
  zoom: number;
};


function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng
        },
        zoom: city.zoom
      });

      const layer = new TileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      );

      instance.addLayer(layer);

      if(isMounted) {
        setMap(instance);
      }
      isRenderedRef.current = true;

      return () => {
        isMounted = false;
      };
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
