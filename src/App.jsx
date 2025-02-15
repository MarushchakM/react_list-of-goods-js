import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_REVERSE = 'reverse';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function getPreparedGoods(goods, { sortFiled, reverse }) {
  const prepareGoods = [...goods];

  if (sortFiled) {
    prepareGoods.sort((good1, good2) => {
      switch (sortFiled) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortFiled, setSortFiled] = useState('');
  const [reverse, setReverse] = useState('');
  const visibleGood = getPreparedGoods(goodsFromServer, { sortFiled, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortFiled(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortFiled !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortFiled(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortFiled !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() =>
            setReverse(reverse === SORT_FIELD_REVERSE ? '' : SORT_FIELD_REVERSE)
          }
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverse !== SORT_FIELD_REVERSE,
          })}
        >
          Reverse
        </button>

        {(sortFiled || reverse) && (
          <button
            onClick={() => {
              setSortFiled('');
              setReverse('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGood.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
