import React from 'react';
import 'components/partTime/ContentLine.scss';

function ContentLine({ filteredPayroll }) {
  const weekArray = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div id="contentline-container">
      {/* {console.log(filteredPayroll[0].timeClock)} */}
      {filteredPayroll() ? (
        filteredPayroll().map((a, i) => {
          return (
            <div className="content-line" key={i}>
              <div className="date-column">{a.start_time}</div>
              <div className="day-column">
                {
                  weekArray[
                    new Date(
                      a.start_time.slice(0, 4),
                      a.start_time.slice(5, 7),
                      a.start_time.slice(8),
                    ).getDay()
                  ]
                }
              </div>
              <div className="clockIn-column">
                {new Date(new Date(a.workTime[0]).getTime() - 540 * 60 * 1000)
                  .toString()
                  .slice(15, 21)}
              </div>
              <div className="clockOut-column">
                {new Date(new Date(a.workTime[1]).getTime() - 540 * 60 * 1000)
                  .toString()
                  .slice(15, 21)}
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
