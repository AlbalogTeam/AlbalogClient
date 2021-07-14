import Aside from 'components/Aside';
import Header from 'components/Header';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ScheduleModal from 'components/Modal/ScheduleModal';
import './AdminSchedule.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import client from 'utils/api';
import DeleteAllScheduleModal from 'components/Modal/DeleteAllScheduleModal';
import ScheduleInfoModal from 'components/Modal/ScheduleInfoModal';

const localizer = momentLocalizer(moment);

const AdminSchedule = () => {
  const employeeList = useSelector(({ shop }) => shop.employees);
  const [isModal, setIsModal] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [infoModalOpened, setInfoModalOpened] = useState(false);
  const locationId = useSelector(({ shop }) => shop._id);
  const [events, setEvents] = useState([]);
  const [employee, setEmployee] = useState('');

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleDeleteModal = (e) => {
    setDeleteModalOpened(!deleteModalOpened);
  };

  const handleInfoModal = async (e) => {
    console.log(e);
    setEmployee(e);
    setInfoModalOpened(!infoModalOpened);
  };

  const getAllSchedule = async () => {
    try {
      const response = await client.get(`/shift/location/${locationId}`);
      const newEvents = response.data.map((employee) => {
        const schedule = {
          title: employee.title,
          start: new Date(new Date(employee.start).getTime() - 540 * 60 * 1000),
          end: new Date(new Date(employee.end).getTime() - 540 * 60 * 1000),
          index: employee._id,
          staffId: employee.staffId,
        };
        return schedule;
      });

      setEvents(newEvents);
    } catch (e) {
      console.error(e);
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let key = '';
    for (let i = 0; i < event.title.length; i++) {
      key += event.title.charCodeAt(i);
    }
    let color = String(key.toString(16)).substr(9, 6);
    let backgroundColor = '#' + color;
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
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
          <div>
            <button className="btn-add" onClick={handleModal}>
              스케줄 추가
            </button>
            <button className="btn-delAll" onClick={handleDeleteModal}>
              스케줄 삭제
            </button>
          </div>
        </div>
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
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleInfoModal}
          />
        </div>
      </div>
      {isModal && (
        <ScheduleModal handleModal={handleModal} employeeList={employeeList} />
      )}
      {deleteModalOpened && (
        <DeleteAllScheduleModal
          handleDeleteModal={handleDeleteModal}
          employeeList={employeeList}
          locationId={locationId}
        />
      )}
      {infoModalOpened && (
        <ScheduleInfoModal
          handleInfoModal={handleInfoModal}
          employee={employee}
          locationId={locationId}
        />
      )}
    </>
  );
};

export default AdminSchedule;
