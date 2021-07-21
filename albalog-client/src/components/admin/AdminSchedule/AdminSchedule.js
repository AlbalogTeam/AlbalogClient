import Aside from 'components/Aside';
import Header from 'components/Header';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './AdminSchedule.scss';
import DeleteAllScheduleModal from 'components/Modal/DeleteAllScheduleModal';
import ScheduleInfoModal from 'components/Modal/ScheduleInfoModal';
import CreateScheduleModal from 'components/Modal/CreateScheduleModal';
import useAdminSchedule from 'hooks/admin/useAdminSchedule';

const localizer = momentLocalizer(moment);

const AdminSchedule = () => {
  const {
    employeeList,
    employee,
    locationId,
    createModalOpend,
    deleteModalOpened,
    infoModalOpened,
    handleInfoModal,
    handleCreateModal,
    handleDeleteModal,
    events,
    eventStyleGetter,
  } = useAdminSchedule();

  return (
    <>
      <Header />
      <Aside />
      <div className="AdminSchedule">
        <div className="schedule-header">
          <h2 className="schedule-title">스케줄 페이지</h2>
          <div>
            <button className="btn-add" onClick={handleCreateModal}>
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
      {createModalOpend && (
        <CreateScheduleModal
          handleCreateModal={handleCreateModal}
          employeeList={employeeList}
        />
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
