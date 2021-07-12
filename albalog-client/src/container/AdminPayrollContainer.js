import AdminPayroll from 'components/admin/AdminPayroll';
import { getMonthData } from 'modules/date';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AdminPayrollContainer = () => {
  const shopId = useSelector(({ shop }) => shop._id);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

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
  });

  return (
    <AdminPayroll
      year={year}
      month={month}
      prevMonth={prevMonth}
      nextMonth={nextMonth}
    />
  );
};

export default AdminPayrollContainer;
