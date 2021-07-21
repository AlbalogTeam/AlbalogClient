import React from 'react';
import 'components/partTime/ContentLine.scss';
import moment from 'moment';

function ContentLine({ filteredPayroll }) {
  const weekArray = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div id="contentline-container">
      {filteredPayroll() ? (
        filteredPayroll().map((a, i) => {
          return (
            <div className="content-line" key={i}>
              <div className="date-column">{a.start_time}</div>
              <div className="day-column">
                {weekArray[moment(a.start_time).day()]}
              </div>
              <div className="clockIn-column">
                {moment(a.workTime[0]).local().format('HH:mm')}
              </div>
              <div className="clockOut-column">
                {moment(a.workTime[1]).local().format('HH:mm')}
              </div>
              <div className="workingtime-column">
                {parseInt(a.workInToday / 60)}시간 {a.workInToday % 60}분
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          출퇴근 기록이 없습니다.
        </div>
      )}
    </div>
  );
}

export default ContentLine;
