import React from 'react';
import 'components/partTime/dashboard/DashboardPersonalschedule.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import moment from 'moment';
import useShift from 'hooks/parttime/useShift';

function DashboardPersonalschedule() {
  const { today, onClickLeft, onClickRight, filteredShift } = useShift();

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
            {filteredShift()
              ? moment(filteredShift()[0].start).format('HH:mm')
              : '-'}
          </b>
        </div>
        <div className="tr">
          퇴근시간
          <b>
            {filteredShift()
              ? moment(filteredShift()[0].start).format('yyyy-MM-DD') ===
                moment(filteredShift()[0].end).format('yyyy-MM-DD')
                ? moment(filteredShift()[0].end).format('HH:mm')
                : moment(filteredShift()[0].end).format('HH:mm') + '+1'
              : '-'}
          </b>
        </div>
      </div>
    </div>
  );
}

export default DashboardPersonalschedule;
