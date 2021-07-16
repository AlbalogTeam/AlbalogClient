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

  // 시간별 필터 함수
  const filteredByTime = (from, to) => {
    const timeFrom = new Date(today.setHours(from));
    const timeTo = new Date(today.setHours(to));
    const searchRange = moment.range(timeFrom, timeTo);
    let filteredTime = filteredShift
      .filter((a) => searchRange.overlaps(moment.range(a.start, a.end)))
      .map((a) => a.title);
    return filteredTime;
  };

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
        <div className="tr">
          <div className="shift">
            <p>오픈 </p>
            <p>08:00 - 12:00</p>
          </div>
          <div className="working-staff">
            {filteredByTime(8, 12).length > 0 ? (
              filteredByTime(8, 12).map((a, i) => <p key={i}>{a}</p>)
            ) : (
              <p>-</p>
            )}
          </div>
        </div>
        <div className="tr">
          <div className="shift">
            <p>미들 </p>
            <p>14:00 - 18:00</p>
          </div>
          <div className="working-staff">
            {filteredByTime(14, 18).length > 0 ? (
              filteredByTime(14, 18).map((a, i) => <p key={i}>{a}</p>)
            ) : (
              <p>-</p>
            )}
          </div>
        </div>
        <div className="tr">
          <div className="shift">
            <p>마감</p>
            <p>18:00 - 23:00</p>
          </div>
          <div className="working-staff">
            {filteredByTime(18, 23).length > 0 ? (
              filteredByTime(18, 23).map((a, i) => <p key={i}>{a}</p>)
            ) : (
              <p>-</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardFullschedule;
