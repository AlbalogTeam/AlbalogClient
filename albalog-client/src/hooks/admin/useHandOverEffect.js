import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getHandOverList } from 'utils/api/adminDashboard';
import requestAxios from 'utils/requestAxios';

export default function useHandOverEffect() {
  const [allTransition, setAllTransition] = useState(null);
  const shopId = useSelector(({ shop }) => shop._id);

  useEffect(() => {
    requestAxios(setAllTransition, getHandOverList, { shopId });
  }, [shopId]);

  return { allTransition };
}
