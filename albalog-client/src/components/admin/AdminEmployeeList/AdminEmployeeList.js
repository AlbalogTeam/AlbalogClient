import Aside from 'components/Aside/Aside';
import Header from 'components/Header/Header';
import Modal from 'components/Modal/Modal';
import SearchBox from 'components/SearchBox/SearchBox';
import React, { useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import './AdminEmployeeList.scss';

const EmployeeInfo = ({ data }) => {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="employee">
      <div className="left">
        <IoPerson className="image" />
        <p className="name">{data.name}</p>
      </div>
      <div className="right">
        <div className="info-container">
          <div className="info">
            <div className="box">
              <p>재직유무</p>
              <p>{data.status}</p>
            </div>
            <div className="box">
              <p>성별</p>
              <p>{data.gender}</p>
            </div>
            <div className="box">
              <p>시급</p>
              <p>{`${data.hourly_wage.toLocaleString()}원`}</p>
            </div>
          </div>
          <button className="btn-detail" onClick={handleModal}>
            정보보기
          </button>
        </div>
      </div>
      {isModal && <Modal handleModal={handleModal} data={data} />}
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
        <SearchBox />
        <div className="employeeList">
          {employeeList &&
            employeeList.map((employee) => (
              <EmployeeInfo
                key={employee.employee._id}
                data={employee.employee}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default AdminEmployeeList;
