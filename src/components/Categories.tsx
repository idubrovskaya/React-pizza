import React from 'react';

type CategoriesProps = {
  categoryIndex: number;
  onClickCategory: (i: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryIndex, onClickCategory }) => {
    const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
    ];

    return (
      <div className='categories'>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryIndex === index ? 'active' : ''}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
