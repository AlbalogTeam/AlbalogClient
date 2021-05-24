import React from 'react';
import './AdminHeader.scss';

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <h1 className="header-left">
        <a href="/">albalog</a>
      </h1>
      <div className="header-right">
        <span className="user-name">관리자님 안녕하세요.</span>
        <button className="btn_logout">로그아웃</button>
        <a href="/notice">공지사항</a>
        <a href="/workmanual/common">업무 매뉴얼</a>
      </div>
    </header>
  );
};

export default AdminHeader;
