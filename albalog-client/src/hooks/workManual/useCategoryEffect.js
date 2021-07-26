import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategories } from 'utils/api/category';

export default function useCategoryEffect() {
  const [categories, setCategories] = useState([]);
  const shop = useSelector((state) => state.shop);
  useEffect(() => {
    const getData = async () => {
      const categories = await getCategories(shop._id);
      setCategories(categories);
    };
    getData();
  }, [shop._id]);

  return {
    categories,
  };
}
