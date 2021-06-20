import React, { useEffect, useState } from 'react';
import 'pages/partTime/schedule/ParttimeScheduler.scss';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { eventList } from './events';
import Header from '../../../components/Header/Header';
import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';

const locales = {
  ko: require('date-fns/locale/ko'),
};
const localizer = dateFnsLocalizer({
  format, //to format dates
  parse, // to parse dates
  startOfWeek, // the day value for the start of the week for a given locale
  getDay, // to get the day from a date
  locales, // arrayof locales
});

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const date = today.getDate();

function ParttimeScheduler() {
  return (
    <>
      <Header />
      <Aside />
      <div id="ParttimeScheduler">
        {console.log(eventList)}
        <div className="container">
          <h2>직원 스케줄러</h2>
          <div className="calendar-box">
            <Calendar
              localizer={localizer}
              defaultView={'week'}
              showMultiDayTimes={true}
              views={['week', 'month']}
              defaultDate={new Date(year, month, date)}
              events={eventList} // array of events
              startAccessor="start" // the property for the start date of events
              endAccessor="end" // the property for the end date of events
              step={30}
              onSelectEvent={(event, e) => {
                console.log(event);
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ParttimeScheduler;
