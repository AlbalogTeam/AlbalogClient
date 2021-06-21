import Aside from 'components/Aside/Aside';
import Header from 'components/Header/Header';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import ScheduleModal from 'components/Modal/ScheduleModal';
import './AdminSchedule.scss';
import { useSelector } from 'react-redux';

const localizer = momentLocalizer(moment);

const AdminSchedule = () => {
  const employeeList = useSelector(({ shop }) => shop.employees);
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };
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
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
          />
        </div>
      </div>
    </>
  );
};

export default AdminSchedule;
