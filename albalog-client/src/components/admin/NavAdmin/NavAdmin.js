import React from 'react';

const NavAdmin = () => {
  return (
    <header className="nav-container">
      <h1 className="nav-logo">Albalog</h1>

      <div className="nav-right">
        <p className="name">관리자님 안녕하세요</p>
        <button className="button-logout">로그아웃</button>
      </div>
    </header>
  );
};

export default NavAdmin;
