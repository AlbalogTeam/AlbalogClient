import React from 'react';
import 'components/partTime/header/ParttimeHeader.scss';

function ParttimeHeader() {
  return (
    <header id="parttime-header">
      <h1 className="header-left">Albalog</h1>
      <div className="header-right">
        <span className="user-name">직원님 안녕하세요.</span>
        <button className="logout-btn">로그아웃</button>
      </div>
    </header>
  );
}

export default ParttimeHeader;
