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
import Loading from 'components/Loading/Loading';

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

function ParttimeScheduler({ option }) {
  console.log(option);
  const parttime = useSelector((state) => state.parttime);
  const allShift = useSelector((state) => state.allShift);
  const [personalShifts] = useState(parttime.one_shift || []);
  const [allShifts] = useState(allShift.allShift || []);
  const [selectedRadio, setSelectedRadio] = useState(option || 'all');

  const onChange = (e) => {
    e.target.value === 'personal' && setSelectedRadio('personal');
    e.target.value === 'all' && setSelectedRadio('all');
  };

  return (
    <>
      {!allShifts && <Loading />}
      <Header />
      <Aside />
      <div id="ParttimeScheduler">
        <div className="container">
          <div className="title">
            <h2>스케줄러</h2>
            <div className="choice">
              <label>
                <input
                  type="radio"
                  name="grade"
                  value="personal"
                  checked={selectedRadio === 'personal' ? true : false}
                  onChange={onChange}
                  className="content-label"
                />
                개인
              </label>
              <label>
                <input
                  type="radio"
                  name="grade"
                  value="all"
                  checked={selectedRadio === 'all' ? true : false}
                  onChange={onChange}
                  className="content-label"
                />
                전체
              </label>
            </div>
          </div>
          <div className="calendar-box">
            {selectedRadio === 'personal' ? (
              <div style={{ width: '100%', height: '100%' }}>
                <Calendar
                  localizer={localizer}
                  defaultView={'month'}
                  showMultiDayTimes={true}
                  views={['week', 'month']}
                  defaultDate={new Date(year, month, date)}
                  events={personalShifts} // array of events
                  startAccessor="start" // the property for the start date of events
                  endAccessor="end" // the property for the end date of events
                  step={30}
                  onSelectEvent={(event, e) => {
                    console.log(event);
                  }}
                />
              </div>
            ) : (
              <div style={{ width: '100%', height: '100%' }}>
                <Calendar
                  localizer={localizer}
                  defaultView={'month'}
                  showMultiDayTimes={true}
                  views={['week', 'month']}
                  defaultDate={new Date(year, month, date)}
                  events={allShifts} // array of events
                  startAccessor="start" // the property for the start date of events
                  endAccessor="end" // the property for the end date of events
                  step={30}
                  onSelectEvent={(event, e) => {
                    console.log(event);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ParttimeScheduler;
