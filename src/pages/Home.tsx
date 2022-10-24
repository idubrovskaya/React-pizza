import React, { useCallback, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { Sort } from '../components/Sort';
import { Categories } from '../components/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { useEffect } from 'react';
import { PizzaBlockLoader } from '../components/PizzaBlock/PizzaBlockSkeleton';
import { Pagination } from '../components/Pagination/Pagination';
import { RootState, useAppDispatch } from '../redux/store';
import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/slice';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, sort, searchValue } = useSelector(
    (state: RootState) => state.filterSlice
  );
  const { pizzas, status } = useSelector(
    (state: RootState) => state.pizzasSlice
  );

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };

  const fetchItems = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');

    dispatch(
      fetchPizzas({
        category,
        sortBy,
        search,
        currentPage: String(currentPage),
        order,
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchItems();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          categoryIndex={categoryId}
          onClickCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Что-то пошло не так :(</h2>
          <p>Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading'
            ? [...new Array(10)].map((_, index) => (
                <PizzaBlockLoader key={index} />
              ))
            : pizzas.map((pizza: any) => (
                <PizzaBlock key={pizza.id} {...pizza} />
              ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
