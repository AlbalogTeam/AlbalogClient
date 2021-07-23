// import RescheduleModal from 'components/Modal/RescheduleModal';
import Aside from 'components/Aside/Aside';
import Header from 'components/Header/Header';
import DashboardAccount from 'components/partTime/dashboard/DashboardAccount';
import DashboardFullschedule from 'components/partTime/dashboard/DashboardFullschedule';
import DashboardNotice from 'components/partTime/dashboard/DashboardNotice';
import DashboardPersonalschedule from 'components/partTime/dashboard/DashboardPersonalschedule';
import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import './PartTimeDashboard.scss';
import { useSelector } from 'react-redux';
import Footer from 'components/Footer/Footer';
import Loading from 'components/Loading/Loading';
import TimeclockModal from 'components/Modal/TimeclockModal';
import useTimeClock from 'hooks/parttime/useTimeClock';
import { weekArray } from 'utils/constants';

function PartTimeDashboard() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const today = year + '-' + month + '-' + date;
  const day = weekArray[new Date().getDay()];
  const shop = useSelector((state) => state.shop);
  const parttime = useSelector((state) => state.parttime);

  const {
    clickClockIn,
    clickClockOut,
    clockIn,
    clockOut,
    timeclockInModal,
    timeclockOutModal,
    timeClockInModalToggle,
    timeClockOutModalToggle,
  } = useTimeClock();

  return (
    <>
      {!parttime && <Loading />}
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
                  {today}-{day}
                </h2>
              </div>
              <div className="schedule">
                <div className="fullSchedule">
                  <div className="textLine">
                    <span>전체 스케줄</span>
                    <Link to={`/parttime/${shop._id}/scheduler`} option={'all'}>
                      <span className="moreBtn">
                        더보기
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </div>
                  <div className="fullScheduleContent">
                    <DashboardFullschedule />
                  </div>
                </div>
                <div className="personalSchedule">
                  <div className="textLine">
                    <span>개인 스케줄</span>
                    <Link
                      to={`/parttime/${shop._id}/scheduler`}
                      option={'personal'}
                    >
                      <span className="moreBtn">
                        더보기
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </div>
                  <div className="personalScheduleContent">
                    <DashboardPersonalschedule />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="secondRow">
            <div className="bottomLeftBox">
              <div className="btnBox">
                <button
                  className="clockInBtn"
                  onClick={timeClockInModalToggle}
                  disabled={clockIn}
                  style={
                    clockIn
                      ? {
                          background: '#ededee',
                          color: 'gray',
                          cursor: 'default',
                        }
                      : { background: 'rgb(18, 113, 175)' }
                  }
                >
                  {clockIn ? '출근 완료' : '출근 하기'}
                </button>
                <button
                  className="clockOutBtn"
                  onClick={timeClockOutModalToggle}
                  disabled={clockOut}
                  style={
                    clockOut
                      ? {
                          background: '#ededee',
                          color: 'gray',
                          cursor: 'default',
                        }
                      : { background: 'rgb(18, 113, 175)' }
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
          {timeclockInModal && (
            <TimeclockModal
              message="출근 하시겠습니까?"
              timeClockModalToggle={timeClockInModalToggle}
              clickClockIn={clickClockIn}
            />
          )}
          {timeclockOutModal && (
            <TimeclockModal
              message="퇴근 하시겠습니까?"
              timeClockModalToggle={timeClockOutModalToggle}
              clickClockOut={clickClockOut}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PartTimeDashboard;
