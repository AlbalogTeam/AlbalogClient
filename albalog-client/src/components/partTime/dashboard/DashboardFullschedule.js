import React from 'react';
import 'components/partTime/dashboard/DashboardFullschedule.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function DashboardFullschedule({ year, month, date, day }) {
  return (
    <div id="fullschedule-content">
      <div className="txtline">
        <IoIosArrowBack style={{ cursor: 'pointer' }} />
        {year}년 {month}월 {date}일 {day}요일
        <IoIosArrowForward style={{ cursor: 'pointer' }} />
      </div>
      <div className="full-table">
        <div className="tr">
          <div className="shift">
            <p>오픈 </p>
            <p>08:00 - 12:00</p>
          </div>
          <p>이도현, 김태희</p>
        </div>
        <div className="tr">
          <div className="shift">
            <p>미들 </p>
            <p>14:00 - 18:00</p>
          </div>
          <p>김태희, 서우리</p>
        </div>
        <div className="tr">
          <div className="shift">
            <p>마감</p>
            <p>18:00 - 22:00</p>
          </div>
          <p>윤영훈, 김동완</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardFullschedule;
