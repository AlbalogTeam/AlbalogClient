import React from 'react';
import { NavLink } from 'react-router-dom';

const ManualCategory = () => {
  // 지금은 임시데이터 , 백앤드 완성되면 카테고리 데이터 불러와야함.
  const categories = [
    {
      name: 'common',
      text: '공통',
    },
    {
      name: 'field',
      text: '홀',
    },
    {
      name: 'kitchen',
      text: '주방',
    },
  ];
  const activeStyle = {
    color: 'rgb(18, 113, 175)',
    fontSize: '16px',
    fontWeight: '700',
  };

  return (
    <div className="manual-category">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <NavLink
              activeStyle={activeStyle}
              exact={category.name === 'common'}
              // to={`/workmanual/${category.name}`}
              to={
                category.name === 'common'
                  ? '/workmanual/'
                  : `/workmanual/${category.name}`
              }
            >
              {category.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManualCategory;
