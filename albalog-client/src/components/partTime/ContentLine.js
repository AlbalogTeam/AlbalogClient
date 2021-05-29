import React from 'react';
import 'components/partTime/ContentLine.scss';

function ContentLine() {
  return (
    <div id="contentline-container">
      <div className="content-line">
        <div className="date-column">2021.05.29</div>
        <div className="day-column">토</div>
        <div className="clockIn-column">09:00</div>
        <div className="clockOut-column">12:00</div>
        <div className="workingtime-column">3시간 00분</div>
      </div>
      <div className="content-line">
        <div className="date-column">2021.05.30</div>
        <div className="day-column">토</div>
        <div className="clockIn-column">09:00</div>
        <div className="clockOut-column">12:00</div>
        <div className="workingtime-column">3시간 00분</div>
      </div>
    </div>
  );
}

export default ContentLine;
