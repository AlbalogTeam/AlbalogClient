import Loading from 'components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCategories } from 'utils/api/category';

const ManualCategory = () => {
  const shop = useSelector((state) => state.shop);
  const render = useSelector((state) => state.render);
  const [categories, setCategories] = useState([]);

  const activeStyle = {
    color: 'rgb(18, 113, 175)',
    fontSize: '16px',
    fontWeight: '700',
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getCategories(shop._id);
      const categoryDefault = [{ name: '전체' }];
      const categoryNewArr = categoryDefault.concat([...result].reverse());
      setCategories(categoryNewArr);
    }
    if (shop.name) {
      fetchData();
    }
  }, [shop, render]);

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
