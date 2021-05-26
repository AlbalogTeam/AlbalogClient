import React from 'react';
import './AdminHeader.scss';

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <h1 className="header-left">
        <a href="/">Albalog</a>
      </h1>
      <div className="header-right">
        <span className="user-name">관리자님 안녕하세요.</span>
        <button className="btn_logout">로그아웃</button>
      </div>
    </header>
  );
};

export default AdminHeader;
