import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminPayroll.scss';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { getMonthData, getNextMonth, getPrevMonth } from 'modules/date';
import PayrollModal from 'components/Modal/PayrollModal';

const Table = ({ employeeList }) => {
  return (
    <table>
      <thead>
        <th>이름</th>
        <th>근무시간</th>
        <th>지급액</th>
        <th>상세보기</th>
      </thead>
      <tbody>
        {employeeList &&
          employeeList.map((employee) => (
            <TableItem key={employee._id} employee={employee} />
          ))}
      </tbody>
    </table>
  );
};

const TableItem = ({ employee }) => {
  const [isModal, setIsModal] = useState(false);
  const { name, monthTime, monthWage } = employee;
  const hour = monthTime / 60;
  const minute = monthTime % 60;

  const handleModal = () => {
    setIsModal(!isModal);
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{`🕑${hour}시간 ${minute}분`}</td>
      <td>{`💸${monthWage.toLocaleString()}원`}</td>
      <td>
        <button className="btn-detail" onClick={handleModal}>
          선택
        </button>
        {isModal && <PayrollModal data={employee} handleModal={handleModal} />}
      </td>
    </tr>
  );
};

const AdminPayroll = () => {
  const shopId = useSelector(({ shop }) => shop._id);
  const { year, month } = useSelector(({ date }) => date);
  const employeeList = useSelector(({ date }) => date.payrollData);
  const fixed = 1;

  const dispatch = useDispatch();

  const prevMonth = () => {
    dispatch(getPrevMonth({ year, month, shopId }));
  };

  const nextMonth = () => {
    dispatch(getNextMonth({ year, month, shopId }));
  };

  useEffect(() => {
    dispatch(getMonthData({ year, month, shopId }));
  }, [fixed]);

  return (
    <>
      <Header />
      <Aside />
      <div className="payroll-container">
        <h1 className="payroll-title">급여관리</h1>
        <div className="wrap">
          <nav className="month-select">
            <RiArrowLeftSLine className="month-button" onClick={prevMonth} />
            <h3>{`📅 ${year}년 ${month}월`}</h3>
            <RiArrowRightSLine className="month-button" onClick={nextMonth} />
          </nav>
          <Table employeeList={employeeList} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPayroll;
