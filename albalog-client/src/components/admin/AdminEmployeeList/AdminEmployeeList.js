import Aside from 'components/Aside';
import Footer from 'components/Footer';
import Header from 'components/Header';
import EmployeeInfoModal from 'components/Modal/EmployeeInfoModal';
import NoDataType1 from 'components/NoData/NoDataType1';
import React, { useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import './AdminEmployeeList.scss';
import EmployeeListIMG from 'static/EmployeeList.png';

const EmployeeInfo = ({ data }) => {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  if (!data) {
    return;
  }

  const { name, status, gender, hourly_wage } = data;

  return (
    <div className="employee">
      <div className="left">
        <IoPerson className="image" />
        <p className="name">{name}</p>
      </div>
      <div className="right">
        <div className="info-container">
          <div className="info">
            <div className="box">
              <p>재직유무</p>
              <p>{status}</p>
            </div>
            <div className="box">
              <p>성별</p>
              <p>{gender}</p>
            </div>
            <div className="box">
              <p>시급</p>
              <p>{`${hourly_wage.toLocaleString()}원`}</p>
            </div>
          </div>
          <button className="btn-detail" onClick={handleModal}>
            정보보기
          </button>
        </div>
      </div>
      {isModal && <EmployeeInfoModal handleModal={handleModal} data={data} />}
    </div>
  );
};

const AdminEmployeeList = () => {
  const employeeList = useSelector(({ shop }) => shop.employees);

  return (
    <>
      <Header />
      <Aside />
      <div className="employeeList-container">
        <h1>직원 리스트</h1>
        <div className="employeeList">
          {employeeList && employeeList.length < 1 ? (
            <div className="img-center">
              <NoDataType1
                text={'직원이 존재하지 않습니다'}
                img={EmployeeListIMG}
              />
            </div>
          ) : (
            ''
          )}
          {employeeList &&
            employeeList.map((employee) => (
              <EmployeeInfo
                key={employee.employee._id}
                data={employee.employee}
              />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminEmployeeList;
