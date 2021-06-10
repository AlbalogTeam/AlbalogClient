import React from 'react';
import 'components/partTime/dashboard/DashboardPersonalschedule.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function DashboardPersonalschedule({ year, month, date, day }) {
  return (
    <div id="personalschedule-content">
      <div className="txtline">
        <IoIosArrowBack style={{ cursor: 'pointer' }} />
        {year}년 {month}월 {date}일 {day}요일
        <IoIosArrowForward style={{ cursor: 'pointer' }} />
      </div>
      <div className="personal-table">
        <div className="tr">
          <b>오픈</b>
        </div>
        <div className="tr">
          출근시간 <b>08:00</b>
        </div>
        <div className="tr">
          퇴근시간 <b>12:00</b>
        </div>
      </div>
    </div>
  );
}

export default DashboardPersonalschedule;
