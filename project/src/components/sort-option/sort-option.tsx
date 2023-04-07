import { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../hooks';
import { changeSortType } from '../../store/action';
import { SortType } from '../../const';

function SortOption():JSX.Element {
  const [sortSettings, setSortSettings] = useState({
    sortType: SortType.DEFAULT,
    isOpen: false,
  });

  const dispatch = useAppDispatch();
  const sortValues = Object.values(SortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type"
        tabIndex={0}
        onClick={()=> {
          setSortSettings({
            ...sortSettings,
            isOpen: true
          });
        }}
      >
        {sortSettings.sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortSettings.isOpen ? 'places__options--opened' : ''}`}>
        {
          sortValues.map((value, index) => {
            const keyValue = `${value}-${index}`;
            const itemClassName = classNames('places__option', {
              'places__option--active': value === sortSettings.sortType,
            });
            return (
              <li
                key={keyValue}
                className={itemClassName}
                tabIndex={0}
                onClick={()=> {
                  setSortSettings({
                    sortType: value,
                    isOpen: false,
                  });
                  dispatch(changeSortType(value));
                }}
              >{value}
              </li>
            );
          })
        }
      </ul>
    </form>
  );
}

export default SortOption;
