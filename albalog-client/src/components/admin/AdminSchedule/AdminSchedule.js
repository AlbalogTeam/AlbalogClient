import Aside from 'components/Aside/Aside';
import Header from 'components/Header/Header';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import ScheduleModal from 'components/Modal/ScheduleModal';
import './AdminSchedule.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import client from 'utils/api';

const localizer = momentLocalizer(moment);

const AdminSchedule = () => {
  const employeeList = useSelector(({ shop }) => shop.employees);
  const [isModal, setIsModal] = useState(false);
  const locationId = useSelector(({ shop }) => shop._id);
  const [events, setEvents] = useState([]);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const getAllSchedule = async () => {
    try {
      const response = await client.get(`/shift/location/${locationId}`);
      console.log(response);
      setEvents(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllSchedule();
  }, [employeeList]);

  return (
    <>
      <Header />
      <Aside />
      <div className="AdminSchedule">
        <div className="schedule-header">
          <h2 className="schedule-title">스케줄 페이지</h2>
          <button className="btn-add" onClick={handleModal}>
            스케줄 추가
          </button>
        </div>
        {isModal && (
          <ScheduleModal
            handleModal={handleModal}
            employeeList={employeeList}
          />
        )}
        <div className="schedule-calendar">
          <Calendar
            defaultView={'month'}
            showMultiDayTimes={true}
            views={['week', 'month']}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            step={30}
            onSelectEvent={(event, e) => {
              console.log(event);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AdminSchedule;
