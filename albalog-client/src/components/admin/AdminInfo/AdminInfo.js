import axios from 'axios';
import Aside from 'components/Aside/Aside';
import Header from 'components/Header/Header';
import React, { useEffect, useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import './AdminInfo.scss';

const AdminInfo = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users/1',
        );
        setUser(response.data);
        console.log(user);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Header />
      <Aside />
      <div className="adminInfo-container">
        {user && (
          <div className="info-wrap">
            <h3>Profile</h3>
            <IoPerson className="user-image" />
            <form className="form-info">
              <label htmlFor="name">이름</label>
              <input type="text" disabled value={user.name} id="name" />
              <label htmlFor="id">아이디</label>
              <input type="text" disabled value={user.username} id="id" />
              <label htmlFor="gender">성별</label>
              <input type="text" disabled value="남" id="gender" />
              <label htmlFor="birth">생년월일</label>
              <input type="text" disabled value="1996-01-08" id="birth" />
            </form>
            <button>비밀번호 변경하기</button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminInfo;
