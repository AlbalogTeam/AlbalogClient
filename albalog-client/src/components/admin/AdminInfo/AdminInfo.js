import Aside from 'components/Aside';
import Header from 'components/Header';
import React from 'react';
import { IoPerson } from 'react-icons/io5';
import './AdminInfo.scss';
import Footer from 'components/Footer';
import useAdminInfo from 'hooks/admin/useAdminInfo';

const AdminInfo = () => {
  const {
    name,
    email,
    password,
    newPassword,
    newPasswordCheck,
    error,
    onChange,
    onSubmit,
  } = useAdminInfo();

  return (
    <>
      <Header />
      <Aside />
      <div className="adminInfo-container">
        <div className="info-wrap">
          <h3>Profile</h3>
          <IoPerson className="user-image" />
          <form className="form-info" onSubmit={onSubmit}>
            <label htmlFor="email">이메일</label>
            <input type="text" disabled value={email} id="email" />
            <label htmlFor="name">이름</label>
            <input type="text" value={name} id="name" onChange={onChange} />
            <label htmlFor="password">현재 비밀번호</label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={onChange}
            />
            <label htmlFor="newPassword">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              id="newPassword"
              onChange={onChange}
            />
            <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
            <input
              type="password"
              value={newPasswordCheck}
              id="newPasswordCheck"
              onChange={onChange}
            />
            {error && (
              <span style={{ color: 'red', textAlign: 'center' }}>{error}</span>
            )}
            <button
              className={
                newPassword === newPasswordCheck ? 'button' : 'btn-disabled'
              }
            >
              변경하기
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminInfo;
