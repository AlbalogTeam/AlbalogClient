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

function ParttimeScheduler() {
  const parttime = useSelector((state) => state.parttime);
  const allShift = useSelector((state) => state.allShift);
  const [personalShifts] = useState(parttime.one_shift || []);
  const [allShifts] = useState(allShift.allShift || []);
  const [selectedRadio, setSelectedRadio] = useState('all');
  const [colorAssigned] = useState({});
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

  // event 슬롯 색 정하기
  const eventStyleGetter = (event) => {
    const title = event.title;

    if (!Object.keys(colorAssigned).includes(title)) {
      const getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      colorAssigned[title] = getRandomColor();
    }

    let style = {
      backgroundColor: colorAssigned[title],
      borderRadius: '5px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };

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
                {/* 개인 스케줄 */}
                <Calendar
                  localizer={localizer}
                  defaultView={'month'}
                  showMultiDayTimes={true}
                  views={['week', 'month']}
                  defaultDate={today}
                  events={personalShifts} // array of events
                  startAccessor="start" // the property for the start date of events
                  endAccessor="end" // the property for the end date of events
                  step={30}
                  eventPropGetter={eventStyleGetter}
                  onSelectEvent={(event, e) => {
                    console.log(event);
                  }}
                />
              </div>
            ) : (
              <div style={{ width: '100%', height: '100%' }}>
                {/* 전체 스케줄 */}
                <Calendar
                  localizer={localizer}
                  defaultView={'month'}
                  showMultiDayTimes={true}
                  views={['week', 'month']}
                  defaultDate={today}
                  events={allShifts} // array of events
                  startAccessor="start" // the property for the start date of events
                  endAccessor="end" // the property for the end date of events
                  step={30}
                  eventPropGetter={eventStyleGetter}
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
