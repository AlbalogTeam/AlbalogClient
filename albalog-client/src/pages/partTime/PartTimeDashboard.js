import RescheduleModal from 'components/Modal/RescheduleModal';
import Aside from 'components/Aside/Aside';
import Header from 'components/Header/Header';
import DashboardAccount from 'components/partTime/dashboard/DashboardAccount';
import DashboardFullschedule from 'components/partTime/dashboard/DashboardFullschedule';
import DashboardNotice from 'components/partTime/dashboard/DashboardNotice';
import DashboardPersonalschedule from 'components/partTime/dashboard/DashboardPersonalschedule';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import './PartTimeDashboard.scss';
import { useSelector } from 'react-redux';
import client from 'utils/api';
import Footer from 'components/Footer/Footer';

function PartTimeDashboard() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const today = year + '-' + month + '-' + date;
  const shop = useSelector((state) => state.shop);
  const user = useSelector((state) => state.user);
  const parttime = useSelector((state) => state.parttime);

  const weekArray = ['일', '월', '화', '수', '목', '금', '토'];
  const day = weekArray[new Date().getDay()];

  let clockOut = false;

  const todaytimeclockIn = parttime.timeclock.find(
    (a) => new Date(a.start_time).toDateString() === new Date().toDateString(),
  );

  const todaytimeclockOut = parttime.timeclock.find(
    (a) => new Date(a.end_time).toDateString() === new Date().toDateString(),
  );

  const getprofile = () => {
    try {
      client.get(`/location/${shop._id}/employees/${user._id}`).then((res) => {
        sessionStorage.setItem('parttime', JSON.stringify(res.data));
        window.location.replace(`/parttime/${shop._id}`);
      });
    } catch (e) {
      console.log('getprofileErr' + e);
    }
  };
  const clickClockIn = (e) => {
    let newForm = {
      locationId: shop._id,
      start_time: new Date(),
      wage: 1000,
    };

    const pushdata = async () => {
      try {
        // console.log(body);
        let response = await client
          .post(`/timeclock/start`, newForm)
          .then((response) => {
            if (response.status === 201) {
              getprofile();
            }
          });
      } catch (e) {
        console.log(e);
      }
    };
    pushdata();
  };

  const clickClockOut = (e) => {
    if (!clockOut) {
      clockOut = true;
    }
    const newForm = {
      locationId: shop._id,
      end_time: new Date(),
      timeClockId: todaytimeclockIn._id,
    };
    const pushdata = async () => {
      try {
        let response = await client
          .post(`/timeclock/end`, newForm)
          .then((response) => {
            if (response.status === 201) {
              getprofile();
            }
          });
      } catch (e) {
        console.log(e);
      }
    };
    pushdata();
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
                  {today}-{day}
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
                    <Link to={`/parttime/${shop._id}/scheduler`}>
                      <span className="moreBtn">
                        더보기
                        <IoIosArrowForward />
                      </span>
                    </Link>
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
                  disabled={todaytimeclockIn ? true : false}
                  style={
                    todaytimeclockIn
                      ? {
                          background: '#ededee',
                          color: 'gray',
                          cursor: 'default',
                        }
                      : { background: 'rgb(18, 113, 175)' }
                  }
                >
                  {todaytimeclockIn ? '출근 완료' : '출근 하기'}
                </button>
                <button
                  className="clockOutBtn"
                  onClick={clickClockOut}
                  disabled={
                    todaytimeclockOut ? true : todaytimeclockIn ? false : true
                  }
                  style={
                    todaytimeclockOut
                      ? {
                          background: '#ededee',
                          color: 'gray',
                          cursor: 'default',
                        }
                      : todaytimeclockIn
                      ? { background: 'rgb(18, 113, 175)' }
                      : {
                          background: '#ededee',
                          color: 'gray',
                          cursor: 'default',
                        }
                  }
                >
                  {todaytimeclockOut ? '퇴근 완료' : '퇴근 하기'}
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
      <Footer />
    </>
  );
}

export default PartTimeDashboard;
