import { React, useState } from 'react';
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosWarning,
} from 'react-icons/io';
import 'pages/partTime/WorkingTime.scss';
import ContentLine from 'components/partTime/ContentLine';
import Header from 'components/Header/Header';
import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';

function WorkingTime() {
  return (
    <>
      <Header />
      <Aside />
      <div id="workingtime">
        <div className="workingtime-container">
          <h2>일한시간</h2>
          <div className="table">
            <div className="date-line">
              <IoIosArrowBack style={{ width: '30px', margin: '0 50px' }} />
              2021.05
              <IoIosArrowForward style={{ width: '30px', margin: '0 50px' }} />
            </div>
            <div className="head-line">
              <div className="date-column">날짜</div>
              <div className="day-column">요일</div>
              <div className="clockIn-column">출근시간</div>
              <div className="clockOut-column">퇴근시간</div>
              <div className="workingtime-column">근무시간</div>
            </div>
            <ContentLine />
            <div className="total-line">
              <div className="date-column"></div>
              <div className="day-column"></div>
              <div className="clockIn-column"></div>
              <div className="clockOut-column"></div>
              <div className="workingtime-column">
                <b>6시간 00분</b>
              </div>
            </div>
          </div>
          <div className="remark-line">
            <IoIosWarning style={{ width: '20px' }} />
            근무자가 출근한 뒤 15시간동안 퇴근하지 않으면 자동으로 퇴근처리되며
            '퇴근미체크'로 표기됩니다.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WorkingTime;
