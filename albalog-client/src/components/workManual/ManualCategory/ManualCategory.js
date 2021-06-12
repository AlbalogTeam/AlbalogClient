import axios from 'axios';
import { APIURL } from 'config';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const ManualCategory = () => {
  // 지금은 임시데이터 , 백앤드 완성되면 카테고리 데이터 불러와야함.
  const [categories, setCategories] = useState([]);

  const activeStyle = {
    color: 'rgb(18, 113, 175)',
    fontSize: '16px',
    fontWeight: '700',
  };

  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${APIURL}/category/${shop._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(result.data);
      setCategories(result.data);
    }
    fetchData();
  }, []);

  return (
    <div className="manual-category">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <NavLink
              activeStyle={activeStyle}
              exact={category.name === '전체'}
              // to={`/workmanual/${category.name}`}
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
