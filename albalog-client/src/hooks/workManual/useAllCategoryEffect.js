import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategories } from 'utils/api/category';

export default function useAllCategoryEffect() {
  const shop = useSelector((state) => state.shop);
  const render = useSelector((state) => state.render);
  const [categories, setCategories] = useState([]);

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

  return {
    categories,
    shop,
  };
}
