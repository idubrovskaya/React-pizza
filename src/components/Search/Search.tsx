import React, { useCallback, useContext, useRef, useState } from 'react';

import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filter/slice';

export const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Введите название пиццы'
      />
      <img className={styles.searchIcon} src='img/search.svg' alt='search' />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.clearIcon}
          src='img/clear.svg'
          alt='clear'
        />
      )}
    </div>
  );
};
