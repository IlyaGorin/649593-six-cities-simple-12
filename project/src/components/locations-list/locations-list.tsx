import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/app-data/app-data.slice';
import { LocationNameType } from '../../const';

type LocationsListProps = {
  locationsNames: LocationNameType;
}

function LocationsList({locationsNames}: LocationsListProps):JSX.Element {
  const [cityName, setCityName] = useState<string | undefined>('Paris');
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {locationsNames.map((name) => (
        <li className="locations__item" key={name}>
          <a className={`locations__item-link tabs__item ${name === cityName ? 'tabs__item--active' : ''}`} href="#" data-name={name}
            onClick={(evt: React.MouseEvent<HTMLElement>)=> {
              evt.preventDefault();
              const dataNameValue: string | undefined = (evt.currentTarget as HTMLElement).dataset.name;
              setCityName(dataNameValue);
              if(dataNameValue !== undefined) {
                dispatch(changeCity(dataNameValue));
              }
            }}
          >
            <span>{name}</span>
          </a>
        </li>
      ))}

    </ul>
  );
}

export default LocationsList;
