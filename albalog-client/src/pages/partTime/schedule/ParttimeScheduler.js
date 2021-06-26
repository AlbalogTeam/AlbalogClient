import React, { useState } from 'react';
import 'pages/partTime/schedule/ParttimeScheduler.scss';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import Header from '../../../components/Header/Header';
import Aside from 'components/Aside/Aside';
import Footer from 'components/Footer/Footer';
import { useSelector } from 'react-redux';
import { APIURL } from 'config';
import client from 'utils/api';
import { useEffect } from 'react';

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
  const user = useSelector((state) => state.user);
  const [shifts, setShifts] = useState([]);

  const getSchedule = async () => {
    try {
      const response = await client.get(`${APIURL}/shift/employee/${user._id}`);
      let shift = await response.data.map((a) => {
        const st = new Date(new Date(a.start).getTime() - 540 * 60 * 1000);
        const ed = new Date(new Date(a.end).getTime() - 540 * 60 * 1000);

        let newData = {
          title: user.name,
          start: new Date(st),
          end: new Date(ed),
        };

        return newData;
      });
      console.log(shift);
      console.log(response.data);
      setShifts(shift);
    } catch (error) {}
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <>
      <Header />
      <Aside />
      <div id="ParttimeScheduler">
        <div className="container">
          <h2>직원 스케줄러</h2>
          <div className="calendar-box">
            <Calendar
              localizer={localizer}
              defaultView={'month'}
              showMultiDayTimes={true}
              views={['week', 'month']}
              defaultDate={new Date(year, month, date)}
              events={shifts} // array of events
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
