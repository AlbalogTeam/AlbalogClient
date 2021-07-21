import React, { useState } from 'react';
import 'components/partTime/dashboard/DashboardPersonalschedule.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import moment from 'moment';

function DashboardPersonalschedule({ year, month, date }) {
  const one_shift = useSelector((state) => state.parttime.one_shift);

  const [today, setToday] = useState(moment().format('YYYY-MM-DD'));
  const [filteredShift, setFilteredShift] = useState([]);

  const onClickLeft = () => {
    setToday(moment(today).subtract(1, 'd').format('YYYY-MM-DD'));
  };
  const onClickRight = () => {
    setToday(moment(today).add(1, 'd').format('YYYY-MM-DD'));
  };

  useEffect(() => {
    if (!one_shift) {
      return;
    }
    let filteredShift = one_shift.filter(
      (a) =>
        moment(a.start).format('yyyy-MM-DD') ===
        moment(today).format('yyyy-MM-DD'),
    );
    setFilteredShift(filteredShift);
  }, [one_shift, today]);

  return (
    <div id="personalschedule-content">
      <div className="txtline">
        <IoIosArrowBack onClick={onClickLeft} />
        {today}
        <IoIosArrowForward onClick={onClickRight} />
      </div>

      <div className="personal-table">
        <div className="tr">
          출근시간
          <b>
            {filteredShift[0]
              ? moment(filteredShift[0].start).format('HH:mm')
              : '-'}
          </b>
        </div>
        <div className="tr">
          퇴근시간
          <b>
            {filteredShift[0]
              ? moment(filteredShift[0].start).format('yyyy-MM-DD') ===
                moment(filteredShift[0].end).format('yyyy-MM-DD')
                ? moment(filteredShift[0].end).format('HH:mm')
                : moment(filteredShift[0].end).format('HH:mm') + '+1'
              : '-'}
          </b>
        </div>
      </div>
    </div>
  );
}

export default DashboardPersonalschedule;
