import React, { useEffect, useState } from 'react';
import 'components/partTime/dashboard/DashboardFullschedule.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { FaCalendarTimes } from 'react-icons/fa';
import moment from 'moment';

function DashboardFullschedule() {
  const allShifts = useSelector((state) => state.allShift.allShift);
  const [today, setToday] = useState(moment().format('YYYY-MM-DD'));
  const [filteredShift, setFilteredShift] = useState([]);

  const onClickLeft = () => {
    setToday(moment(today).subtract(1, 'd').format('YYYY-MM-DD'));
  };
  const onClickRight = () => {
    setToday(moment(today).add(1, 'd').format('YYYY-MM-DD'));
  };

  // 날짜별 shift 필터
  useEffect(() => {
    if (!allShifts) {
      return;
    }
    let filteredShift = allShifts.filter(
      (a) => moment(a.start).format('YYYY-MM-DD') === today,
    );
    setFilteredShift(filteredShift);
  }, [allShifts, today]);

  return (
    <div id="fullschedule-content">
      <div className="txtline">
        <IoIosArrowBack onClick={onClickLeft} />
        {today}
        <IoIosArrowForward onClick={onClickRight} />
      </div>
      <div className="full-table">
        {filteredShift.length > 0 ? (
          filteredShift
            .sort((a, b) => a.start - b.start)
            .map((a, i) => {
              return (
                <div className="tr" key={i}>
                  <div className="worker">
                    <p key={i}>{a.title}</p>
                  </div>
                  <div className="working-time">
                    <p>{moment(a.start).format('hh:mm')}</p>~
                    <p>{moment(a.end).format('hh:mm')}</p>
                  </div>
                </div>
              );
            })
        ) : (
          <FaCalendarTimes />
        )}
      </div>
    </div>
  );
}

export default DashboardFullschedule;
