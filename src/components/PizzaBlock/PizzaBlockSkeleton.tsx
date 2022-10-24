import React from 'react';
import ContentLoader from 'react-content-loader';

export const PizzaBlockLoader: React.FC = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={466}
    viewBox='0 0 280 466'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <circle cx='137' cy='123' r='123' />
    <rect x='0' y='270' rx='10' ry='10' width='280' height='27' />
    <rect x='0' y='314' rx='10' ry='10' width='280' height='88' />
    <rect x='0' y='427' rx='10' ry='10' width='70' height='27' />
    <rect x='126' y='416' rx='30' ry='30' width='152' height='45' />
  </ContentLoader>
);
