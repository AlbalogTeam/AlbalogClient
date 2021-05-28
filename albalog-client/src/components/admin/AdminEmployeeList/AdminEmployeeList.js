import axios from 'axios';
import Modal from 'components/Modal/Modal';
import SearchBox from 'components/SearchBox/SearchBox';
import React, { useEffect, useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import './AdminEmployeeList.scss';

const EmployeeInfo = ({ name, email, username }) => {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };
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
              <p>유형</p>
              <p>{name}</p>
            </div>
            <div className="box">
              <p>직책</p>
              <p>{username}</p>
            </div>
            <div className="box">
              <p>시급</p>
              <p>{email}</p>
            </div>
          </div>
          <button className="btn-detail" onClick={handleModal}>
            정보보기
          </button>
        </div>
      </div>
      {isModal && <Modal handleModal={handleModal} />}
    </div>
  );
};

const AdminEmployeeList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        setData(response.data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div className="employeeList-container">
      <h1>직원 리스트</h1>
      <SearchBox />
      <div className="employeeList">
        {data &&
          data.map((data) => (
            <EmployeeInfo
              key={data.id}
              name={data.name}
              email={data.email}
              username={data.username}
            />
          ))}
      </div>
    </div>
  );
};

export default AdminEmployeeList;
