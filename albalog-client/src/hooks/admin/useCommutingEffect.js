import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommutingStatus } from 'utils/api/adminDashboard';

export default function useCommutingEffect() {
  const [employeeList, setEmployeeList] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const shopId = useSelector(({ shop }) => shop._id);

  const getData = async () => {
    try {
      const response = await getCommutingStatus({ shopId });
      setEmployeeList(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [shopId]);
  return {
    employeeList,
    year,
    month,
    day,
  };
}
