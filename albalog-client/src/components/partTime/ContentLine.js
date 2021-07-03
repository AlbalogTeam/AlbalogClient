import React from 'react';
import 'components/partTime/ContentLine.scss';

function ContentLine({ month, filteredPayroll }) {
  return (
    <div id="contentline-container">
      {/* {console.log(filteredPayroll[0].timeClock)} */}
      {filteredPayroll().map((a) => {
        return (
          <div className="content-line">
            <div className="date-column">
              {a.start_time.slice(0, 2)}.{a.start_time.slice(2)}
            </div>
            <div className="day-column">토</div>
            <div className="clockIn-column">
              {a.workTime.slice(0, 2)}:{a.workTime.slice(2, 4)}
            </div>
            <div className="clockOut-column">
              {a.workTime.slice(5, 7)}:{a.workTime.slice(7)}
            </div>
            <div className="workingtime-column">
              {parseInt(a.workInToday / 60)}시간 {a.workInToday % 60}분
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContentLine;
