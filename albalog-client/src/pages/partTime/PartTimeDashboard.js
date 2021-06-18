import RescheduleModal from 'components/Modal/RescheduleModal';
import Aside from 'components/Aside/Aside';
import Header from 'components/Header/Header';
import DashboardAccount from 'components/partTime/dashboard/DashboardAccount';
import DashboardFullschedule from 'components/partTime/dashboard/DashboardFullschedule';
import DashboardNotice from 'components/partTime/dashboard/DashboardNotice';
import DashboardPersonalschedule from 'components/partTime/dashboard/DashboardPersonalschedule';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import './PartTimeDashboard.scss';
import { useSelector } from 'react-redux';

function PartTimeDashboard() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const shop = useSelector((state) => state.shop);

  const weekArray = ['일', '월', '화', '수', '목', '금', '토'];
  const day = weekArray[today.getDay()];

  const [clockIn, setclockIn] = useState(false);
  const clickClockIn = (e) => {
    if (!clockIn) setclockIn(true);
    e.target.style.background = 'gray';
  };

  const [clockOut, setclockOut] = useState(false);
  const clickClockOut = (e) => {
    if (!clockOut) {
      setclockOut(true);
      e.target.style.background = 'gray';
    }
  };

  const [Modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!Modal);
  };

  return (
    <>
      <Header />
      <Aside />
      <div id="partTimeDashboard">
        <div className="container">
          <div className="firstRow">
            <div className="topLeftBox">
              <DashboardAccount />
            </div>
            <div className="topRightBox">
              <div className="title">
                <h2>
                  {year} - {month} - {date} - {day}
                </h2>
              </div>
              <div className="schedule">
                <div className="fullSchedule">
                  <div className="textLine">
                    <span>전체 스케줄</span>
                    <span className="moreBtn">
                      더보기
                      <IoIosArrowForward />
                    </span>
                  </div>
                  <div className="fullScheduleContent">
                    <DashboardFullschedule
                      year={year}
                      month={month}
                      date={date}
                      day={day}
                    />
                  </div>
                </div>
                <div className="personalSchedule">
                  <div className="textLine">
                    <span>개인 스케줄</span>
                    <span className="moreBtn">
                      더보기
                      <IoIosArrowForward />
                    </span>
                  </div>
                  <div className="personalScheduleContent">
                    <DashboardPersonalschedule
                      year={year}
                      month={month}
                      date={date}
                      day={day}
                    />
                  </div>
                  <button className="">스케줄 변경 신청</button>
                </div>
              </div>
            </div>
          </div>
          <div className="secondRow">
            <div className="bottomLeftBox">
              <div className="btnBox">
                <button
                  className="clockInBtn"
                  onClick={clickClockIn}
                  style={
                    clockIn
                      ? { background: 'gray' }
                      : { background: 'rgb(18, 113, 175)' }
                  }
                >
                  {clockIn ? '출근 완료' : '출근 하기'}
                </button>
                <button
                  className="clockOutBtn"
                  onClick={clickClockOut}
                  style={
                    clockOut
                      ? { background: 'gray' }
                      : clockIn
                      ? { background: 'rgb(18, 113, 175)' }
                      : { background: 'gray' }
                  }
                >
                  {clockOut ? '퇴근 완료' : '퇴근 하기'}
                </button>
              </div>
            </div>
            <div className="bottomRightBox">
              <div className="noticeBox">
                <div className="textLine">
                  <span>공지사항</span>
                  <Link to={`/${shop._id}/notice`}>
                    <span className="moreBtn">
                      더보기
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </div>
                <DashboardNotice />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PartTimeDashboard;
