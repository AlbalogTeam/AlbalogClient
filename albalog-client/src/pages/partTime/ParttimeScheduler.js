import React, { useState } from 'react';
import 'pages/partTime/ParttimeScheduler.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';

// const localizer = momentLocalizer(moment);

function ParttimeScheduler() {
  // const [events, setEvents] = useState([
  //   {
  //     start: moment().toDate(),
  //     end: moment().add(1, 'days').toDate(),
  //     title: 'Some title',
  //   },
  // ]);

  return (
    <div id="ParttimeScheduler">
      <div className="container">
        <h2>직원 스케줄러</h2>
        <div className="calendar-box">
          {/* <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            style={{ height: '100vh' }}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default ParttimeScheduler;
