import React from 'react';
import 'components/partTime/dashboard/DashboardFullschedule.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaCalendarTimes } from 'react-icons/fa';
import moment from 'moment';
import useAllShift from 'hooks/common/useAllShift';

function DashboardFullschedule() {
  const { today, onClickLeft, onClickRight, filteredShift } = useAllShift();

  return (
    <div id="fullschedule-content">
      <div className="txtline">
        <IoIosArrowBack onClick={onClickLeft} />
        {today}
        <IoIosArrowForward onClick={onClickRight} />
      </div>
      <div className="full-table">
        {filteredShift().length > 0 ? (
          filteredShift()
            .sort((a, b) => a.start - b.start)
            .map((a, i) => {
              return (
                <div className="tr" key={i}>
                  <div className="worker">
                    <p key={i}>{a.title}</p>
                  </div>
                  <div className="working-time">
                    <p>{moment(a.start).format('HH:mm')}</p>~
                    <p>{moment(a.end).format('HH:mm')}</p>
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
