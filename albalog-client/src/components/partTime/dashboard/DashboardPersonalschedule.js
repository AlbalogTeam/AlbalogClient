import React, { useState } from 'react';
import 'components/partTime/dashboard/DashboardPersonalschedule.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function DashboardPersonalschedule({ year, month, date }) {
  const one_shift = useSelector((state) => state.parttime.one_shift);
  const [today, setToday] = useState(new Date(year, month - 1, date));
  const [filteredShift, setFilteredShift] = useState([]);

  const onClickLeft = () => {
    setToday(new Date(today.setDate(today.getDate() - 1)));
  };
  const onClickRight = () => {
    setToday(new Date(today.setDate(today.getDate() + 1)));
  };

  useEffect(() => {
    if (!one_shift) {
      return;
    }
    let filteredShift = one_shift.filter(
      (a) => a.start.toString().slice(0, 15) === today.toString().slice(0, 15),
    );
    setFilteredShift(filteredShift);
  }, [one_shift, today]);

  return (
    <div id="personalschedule-content">
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
      <div className="personal-table">
        <div className="tr">
          출근시간
          <b>
            {filteredShift[0]
              ? filteredShift[0].start.toLocaleTimeString('en-US', {
                  hour12: false,
                })
              : '-'}
          </b>
        </div>
        <div className="tr">
          퇴근시간
          <b>
            {filteredShift[0]
              ? filteredShift[0].start.toString().slice(0, 15) ===
                filteredShift[0].end.toString().slice(0, 15)
                ? filteredShift[0].end.toLocaleTimeString('en-US', {
                    hour12: false,
                  })
                : filteredShift[0].end.toLocaleTimeString('en-US', {
                    hour12: false,
                  }) + '+1'
              : '-'}
          </b>
        </div>
      </div>
    </div>
  );
}

export default DashboardPersonalschedule;
