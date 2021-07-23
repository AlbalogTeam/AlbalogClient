import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getShopListForOwner, getShopListForParttime } from 'utils/api/shop';

export default function useShopListEffect() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const getDataForOwner = async () => {
    try {
      setLoading(true);
      const locations = await getShopListForOwner();
      setLocations(locations);
    } catch (e) {

    } finally {
      setLoading(false);
    }
  };

  const getDataForParttime = async () => {
    try {
      setLoading(true);
      const locations = await getShopListForParttime();
      setLocations(locations);
    } catch (e) {
      alert('매장 리스트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.role === 'owner') getDataForOwner();
    if (user.role === 'staff') getDataForParttime();
  }, [user.role]);

  return {
    locations,
    loading,
    user,
  };
}
