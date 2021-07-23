import Loading from 'components/Loading/Loading';
import useCategoryEffect from 'hooks/workManual/useCategoryEffect';
import React from 'react';
import { NavLink } from 'react-router-dom';

const ManualCategory = () => {
  const activeStyle = {
    color: 'rgb(18, 113, 175)',
    fontSize: '20px',
    fontWeight: '700',
  };

  const { categories, shop } = useCategoryEffect();

  return (
    <div className="manual-category">
      {shop._id && !categories[0] && <Loading />}
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <NavLink
              activeStyle={activeStyle}
              exact={category.name === '전체'}
              to={
                category.name === '전체'
                  ? `/${shop._id}/workmanual/`
                  : `/${shop._id}/workmanual/${category.name}`
              }
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManualCategory;
