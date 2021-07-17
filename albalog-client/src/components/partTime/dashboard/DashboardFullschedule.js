import React, { useEffect, useState } from 'react';
import 'components/partTime/dashboard/DashboardFullschedule.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

function DashboardFullschedule({ year, month, date }) {
  const allShifts = useSelector((state) => state.allShift.allShift);
  const [today, setToday] = useState(new Date(year, month - 1, date));
  const [filteredShift, setFilteredShift] = useState([]);
  const onClickLeft = () => {
    setToday(new Date(today.setDate(today.getDate() - 1)));
  };
  const onClickRight = () => {
    setToday(new Date(today.setDate(today.getDate() + 1)));
  };

  // 날짜별 shift 필터
  useEffect(() => {
    if (!allShifts) {
      return;
    }
    let filteredShift = allShifts.filter(
      (a) => a.start.toString().slice(0, 15) === today.toString().slice(0, 15),
    );
    setFilteredShift(filteredShift);
  }, [allShifts, today]);

  return (
    <div id="fullschedule-content">
      <div className="txtline">
        <IoIosArrowBack onClick={onClickLeft} />
        {today
          .toLocaleDateString('ko-KR')
          .toString()
          .replace('.', '-')
          .replace('.', '-')
          .replace('.', '')}
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
                    <p>{a.start.toString().slice(15, 21)}</p>~
                    <p>{a.end.toString().slice(15, 21)}</p>
                  </div>
                </div>
              );
            })
        ) : (
          <p>-</p>
        )}
      </div>
    </div>
  );
}

export default DashboardFullschedule;
