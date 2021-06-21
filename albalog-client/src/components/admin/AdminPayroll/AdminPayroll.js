import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import './AdminPayroll.scss';
const AdminPayroll = () => {
  const employeeList = useSelector(({ shop }) => shop.employees);
  console.log(employeeList);
  return (
    <>
      <Header />
      <Aside />
      <div className="payroll-container">
        <h1 className="payroll-title">급여관리</h1>
        <div className="wrap">
          <div className="search-box">
            <form>
              <input type="text" placeholder="직원명을 입력하세요" />
              <button>검색하기</button>
            </form>
          </div>

          <table>
            <thead>
              <th>이름</th>
              <th>근무시간</th>
              <th>지급액</th>
            </thead>
            <tbody>
              {employeeList.map((employee) => (
                <tr>
                  <td>{employee.employee.name}</td>
                  <td>{}</td>
                  <td>700,000원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPayroll;
