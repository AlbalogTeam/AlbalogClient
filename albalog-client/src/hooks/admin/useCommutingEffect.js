import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommutingStatus } from 'utils/api/adminDashboard';
import requestAxios from 'utils/requestAxios';

export default function useCommutingEffect() {
  const [employeeList, setEmployeeList] = useState([]);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const shopId = useSelector(({ shop }) => shop._id);

  useEffect(() => {
    requestAxios(setEmployeeList, getCommutingStatus, { shopId });
  }, [shopId]);

  return {
    employeeList,
    year,
    month,
    day,
  };
}
