import { getMonthData } from 'modules/date';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function useAdminPayrollEffect() {
  const shopId = useSelector(({ shop }) => shop._id);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const employeeList = useSelector(({ date }) => date.payrollData);

  const dispatch = useDispatch();

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
    dispatch(getMonthData({ year, month, shopId }));
  };

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
    dispatch(getMonthData({ year, month, shopId }));
  };

  useEffect(() => {
    dispatch(getMonthData({ year, month, shopId }));
  }, [shopId, dispatch, year, month]);

  return {
    year,
    month,
    employeeList,
    prevMonth,
    nextMonth,
  };
}
