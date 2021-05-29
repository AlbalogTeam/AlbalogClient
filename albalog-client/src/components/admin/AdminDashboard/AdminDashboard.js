import React from 'react';
import './AdminDashboard.scss';
const AdminDashboard = () => {
  return (
    <div className="AdminDashboard">
      <div className="notice">
        <h4 className="title">공지사항</h4>
        <p>어쩌구 저쩌구</p>
      </div>
      <div className="hand-over">
        <h4 className="title">오늘의 인수인계 사항</h4>
        <p>어쩌구 저쩌구</p>
      </div>
      <div className="work">
        <h2 className="date">2021년 5월 26일</h2>
        <div className="status">
          <div className="commute-card">
            <h3 className="title">출근전</h3>
            <div className="content">윤영훈</div>
          </div>
          <div className="commute-card">
            <h3 className="title">근무중</h3>
            <div className="content">이도현</div>
          </div>
          <div className="commute-card">
            <h3 className="title">퇴근</h3>
            <div className="content">서우리</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
