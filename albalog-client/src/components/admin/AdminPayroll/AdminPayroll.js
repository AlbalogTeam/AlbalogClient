import Aside from 'components/Aside';
import Footer from 'components/Footer';
import Header from 'components/Header';
import React, { useState } from 'react';
import './AdminPayroll.scss';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import PayrollModal from 'components/Modal/PayrollModal';
import useAdminPayrollEffect from 'hooks/admin/useAdminPayrollEffect';

const Table = ({ employeeList }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>근무시간</th>
          <th>지급액</th>
          <th>상세보기</th>
        </tr>
      </thead>
      <tbody>
        {!employeeList && <p>데이터를 가져오고 있습니다!</p>}
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
  const hour = Math.floor(monthTime / 60);
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
  const { employeeList, nextMonth, prevMonth, year, month } =
    useAdminPayrollEffect();

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
          <Table key={1} employeeList={employeeList} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPayroll;
