import DashboardAccount from 'components/partTime/DashboardAccount';
import React from 'react';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import './PartTimeDashboard.scss';

function PartTimeDashboard () {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth()+1;
  const date = today.getDate();

  const weekArray = ["일","월","화","수","목","금","토"];
  const day = weekArray[today.getDay()];


  return (
    <div className='container'>
      <div className="firstRow">
        <div className= "topLeftBox">
          <DashboardAccount />
        </div>
        <div className="topRightBox">
          <div className="title">
            <h2>{year} - {month} - {date} - {day}</h2>
          </div>
          <div className="schedule">
            <div className="fullSchedule">전체스케줄</div>
            <div className="personalSchedule">개인스케줄</div>
          </div>
        </div>
      </div>
      <div className="secondRow">
        <div className="bottomLeftBox">
          <div className="btnBox">
            <button className="clockInBtn">출근 하기</button>
            <button className="clockOutBtn">퇴근 하기</button>
          </div>
        </div>
        <div className="bottomRightBox">
          <div className="noticeBox">
            공지사항
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartTimeDashboard;
