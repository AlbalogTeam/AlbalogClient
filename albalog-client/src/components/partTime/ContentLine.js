import React from 'react';
import 'components/partTime/ContentLine.scss';

function ContentLine({ month, filteredPayroll }) {
  function day(number) {
    if (number === 0) return '일';
    else if (number === 1) return '월';
    else if (number === 2) return '화';
    else if (number === 3) return '수';
    else if (number === 4) return '목';
    else if (number === 5) return '금';
    else if (number === 6) return '토';
  }

  return (
    <div id="contentline-container">
      {/* {console.log(filteredPayroll[0].timeClock)} */}
      {filteredPayroll() ? (
        filteredPayroll().map((a) => {
          return (
            <div className="content-line">
              <div className="date-column">{a.start_time}</div>
              <div className="day-column">
                {day(
                  new Date(
                    a.start_time.slice(0, 4),
                    a.start_time.slice(5, 7),
                    a.start_time.slice(8),
                  ).getDay(),
                )}
              </div>
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
