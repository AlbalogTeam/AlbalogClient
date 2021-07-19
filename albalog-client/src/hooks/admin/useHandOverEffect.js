import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getHandOverList } from 'utils/api/adminDashboard';

export default function useHandOverEffect() {
  const [allTransition, setAllTransition] = useState(null);
  const shopId = useSelector(({ shop }) => shop._id);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getHandOverList({ shopId });
        setAllTransition(response.satisfyTransitions);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [shopId]);

  return { allTransition };
}
