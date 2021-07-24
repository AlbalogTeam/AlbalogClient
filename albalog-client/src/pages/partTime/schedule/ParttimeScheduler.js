import React from 'react';
import 'pages/partTime/schedule/ParttimeScheduler.scss';
import { Calendar } from 'react-big-calendar';
import Footer from 'components/Footer/Footer';
import { useSelector } from 'react-redux';
import useScheduler from 'hooks/parttime/useScheduler';
import useAllShift from 'hooks/common/useAllShift';
import useShift from 'hooks/parttime/useShift';
import Header from 'components/Header';
import Aside from 'components/Aside';

function ParttimeScheduler() {
  const parttime = useSelector((state) => state.parttime);
  const allShift = useSelector((state) => state.allShift);

  const { today, eventStyleGetter, localizer, onChange, selectedRadio } =
    useScheduler();
  useAllShift();
  useShift();

  return (
    <>
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
                  events={parttime.one_shift} // array of events
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
                  events={allShift.allShift} // array of events
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
